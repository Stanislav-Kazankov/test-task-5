<template lang="pug">
    .double-range
        lesser-value-field(
            :min-value="minBound"
            :max-value="maxLesserValue"
            :value="lesserValue"
            @trigger-value-update="onLesserValueTriggerUpdate"
        )
        greater-value-field(
            :min-value="minGreaterValue"
            :max-value="maxBound"
            :value="greaterValue"
            @trigger-value-update="onGreaterValueTriggerUpdate"
        )
        .double-range__scale(
            ref="scale"
            @click="onScaleClick"
        )
            .double-range__selection(ref="selection")
            .double-range__handle.double-range__handle--left(
                ref="leftHandle"
                @mousedown.prevent="onHandleMouseDown"
            )
            .double-range__handle.double-range__handle--right(
                ref="rightHandle"
                @mousedown.prevent="onHandleMouseDown"
            )
</template>

<script>
import _ from 'lodash';
import $ from 'jquery';
import LesserValueField from './components/LesserValueField.vue';
import GreaterValueField from './components/GreaterValueField.vue';
import { createNumberPropConfig, createFunctionPropConfig } from '@/modules/propConfigs';

export default {
    components: {
        LesserValueField,
        GreaterValueField,
    },
    props: {
        minBound:
            createNumberPropConfig(
                Number.NEGATIVE_INFINITY,
            ),
        maxBound:
            createNumberPropConfig(
                Number.POSITIVE_INFINITY,
            ),
        initialLesserValue:
            createNumberPropConfig(
                null,
            ),
        initialGreaterValue:
            createNumberPropConfig(
                null,
            ),
        parse:
            createFunctionPropConfig(
                calculatedRealFieldValue =>
                    parseInt(calculatedRealFieldValue, 10),
            ),
    },
    data() {
        return {
            $document: null,
            lesserValue: this.minBound,
            greaterValue: this.maxBound,
            maxLesserValue: this.maxBound,
            minGreaterValue: this.minBound,
            $leftHandle: null,
            $rightHandle: null,
            $scale: null,
            scaleWidth: null,
            handleWidth: null,
            handleHalf: null,
            leftHandleMinPosition: null,
            rightHandleMaxPosition: null,
        };
    },
    created() {
        this.lesserValue = this.initialLesserValue || this.minBound;
        this.greaterValue = this.initialGreaterValue || this.maxBound;
    },
    mounted() {
        this.$document = $(document);
        this.$scale = $(this.$refs.scale);
        this.scaleWidth = this.$scale.width();
        this.$leftHandle = $(this.$refs.leftHandle);
        this.$rightHandle = $(this.$refs.rightHandle);
        this.handleWidth = this.$leftHandle.width();
        this.handleHalf = this.handleWidth / 2;
        this.leftHandleMinPosition = -this.handleHalf;
        this.rightHandleMaxPosition =
            this.scaleWidth - this.handleHalf;
        this.autoSetLeftHandle();
        this.autoSetRightHandle();
    },
    methods: {
        bindedOnMouseUp: () => {},
        bindedOnMouseMove: () => {},
        onLesserValueTriggerUpdate(newValue) {
            this.lesserValue = newValue;
            if (this.$leftHandle) {
                this.autoSetLeftHandle();
            }
            this.minGreaterValue = newValue;
        },
        onGreaterValueTriggerUpdate(newValue) {
            this.greaterValue = newValue;
            if (this.$rightHandle) {
                this.autoSetRightHandle();
            }
            this.maxLesserValue = newValue;
        },
        onHandleMouseDown($event) {
            const $handle = $($event.target);
            $handle.css('z-index', '1');
            if ($handle[0] === this.$leftHandle[0]) {
                this.$rightHandle.css('z-index', '0');
            } else {
                this.$leftHandle.css('z-index', '0');
            }
            const innerOffsetLeft =
                $event.clientX - $handle.offset().left;
            this.bindedOnMouseMove = this.onHandleMouseMove
                .bind(null, $handle, innerOffsetLeft);
            this.$document.on('mousemove', this.bindedOnMouseMove);
            this.bindedOnMouseUp = this.onMouseUp.bind(this);
            this.$document.on('mouseup', this.bindedOnMouseUp);
        },
        onHandleMouseMove($capturedHandle, innerOffsetLeft, $event) {
            const { $scale, $leftHandle, $rightHandle } = this;
            $event.preventDefault();
            const newPosition =
                $event.clientX - $scale.offset().left - innerOffsetLeft;
            if ($capturedHandle[0] === $leftHandle[0]) {
                this.manualSetLeftHandle(newPosition);
            }
            if ($capturedHandle[0] === $rightHandle[0]) {
                this.manualSetRightHandle(newPosition);
            }
        },
        onMouseUp($event) {
            $event.preventDefault();
            this.$document.off('mousemove', this.bindedOnMouseMove);
            this.$document.off('mouseup', this.bindedOnMouseUp);
        },
        onScaleClick($event) {
            const {
                $leftHandle, $scale, handleHalf,
                $rightHandle, handleWidth,
            } = this;
            if ($event.clientX < $leftHandle.offset().left) {
                this.manualSetLeftHandle(
                    $event.clientX - $scale.offset().left - handleHalf,
                );
            } else if ($event.clientX > $rightHandle.offset().left + handleWidth) {
                this.manualSetRightHandle(
                    $event.clientX - $scale.offset().left - handleHalf,
                );
            }
        },
        autoSetLeftHandle() {
            const { lesserValue, maxBound, scaleWidth, handleHalf } = this;
            this.setLeftHandle(
                lesserValue / maxBound * scaleWidth - handleHalf,
            );
        },
        autoSetRightHandle() {
            const { greaterValue, maxBound, scaleWidth, handleHalf } = this;
            this.setRightHandle(
                greaterValue / maxBound * scaleWidth - handleHalf,
            );
        },
        manualSetLeftHandle(newHandlePosition) {
            this.setLeftHandle(newHandlePosition);
            const { $leftHandle, scaleWidth, handleHalf, maxBound } = this;
            const leftCenterPosition =
                $leftHandle.position().left + handleHalf + 1;
            this.lesserValue =
                this.parse(leftCenterPosition / scaleWidth * maxBound);
        },
        manualSetRightHandle(newHandlePosition) {
            this.setRightHandle(newHandlePosition);
            const { $rightHandle, scaleWidth, handleHalf, maxBound } = this;
            const rightCenterPosition =
                $rightHandle.position().left + handleHalf + 1;
            this.greaterValue =
                this.parse(rightCenterPosition / scaleWidth * maxBound);
        },
        setLeftHandle(newHandlePosition) {
            const { handleHalf, leftHandleMinPosition } = this;
            const rightHandlePosition = this.$rightHandle.position().left;
            const validHandlePosition = _.clamp(
                newHandlePosition,
                leftHandleMinPosition,
                rightHandlePosition + 1,
            );
            this.$leftHandle
                .css('left', validHandlePosition - 1 + 'px');
            $(this.$refs.selection)
                .css('left', validHandlePosition + handleHalf + 'px');
            const newSelectionWidth = rightHandlePosition - validHandlePosition;
            $(this.$refs.selection)
                .css('width', newSelectionWidth + 1 + 'px');
        },
        setRightHandle(newHandlePosition) {
            const { rightHandleMaxPosition } = this;
            const leftHandlePosition = this.$leftHandle.position().left;
            const validHandlePosition = _.clamp(
                newHandlePosition,
                leftHandlePosition + 1,
                rightHandleMaxPosition,
            );
            this.$rightHandle
                .css('left', validHandlePosition - 1 + 'px');
            const newSelectionWidth = validHandlePosition - leftHandlePosition;
            $(this.$refs.selection)
                .css('width', newSelectionWidth + 'px');
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'double-range.scss';
</style>
