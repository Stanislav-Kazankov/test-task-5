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
        .double-range__scale(ref="scale")
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
            createNumberPropConfig(this.minBound),
        initialGreaterValue:
            createNumberPropConfig(this.maxBound),
        parse:
            createFunctionPropConfig(
                calculatedRealFieldValue =>
                    parseInt(calculatedRealFieldValue, 10),
            ),
    },
    data() {
        return {
            $document: null,
            lesserValue: this.initialLesserValue,
            greaterValue: this.initialGreaterValue,
            maxLesserValue: this.maxBound,
            minGreaterValue: this.minBound,
            $leftHandle: null,
            $rightHandle: null,
            $scale: null,
            scaleWidth: null,
            handleWidth: null,
            leftHandleMinPosition: null,
            rightHandleMaxPosition: null,

        };
    },
    mounted() {
        this.$document = $(document);
        this.$scale = $(this.$refs.scale);
        this.scaleWidth = this.$scale.width();
        this.$leftHandle = $(this.$refs.leftHandle);
        this.$rightHandle = $(this.$refs.rightHandle);
        this.handleWidth = this.$leftHandle.width();
        this.leftHandleMinPosition = -this.handleWidth / 2;
        this.rightHandleMaxPosition =
            this.scaleWidth - this.handleWidth / 2;
    },
    methods: {
        bindedOnMouseUp: () => {},
        bindedOnMouseMove: () => {},
        onLesserValueTriggerUpdate(newValue) {
            const { maxBound, scaleWidth } = this;
            this.lesserValue = newValue;
            if (this.$leftHandle) {
                this.setLeftHandle(
                    newValue / maxBound * scaleWidth,
                );
            }
            this.minGreaterValue = newValue;
        },
        onGreaterValueTriggerUpdate(newValue) {
            this.greaterValue = newValue;
            this.maxLesserValue = this.greaterValue;
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
        onHandleMouseMove($handle, innerOffsetLeft, $event) {
            const { $scale, $leftHandle, $rightHandle } = this;
            $event.preventDefault();
            const newPosition =
                $event.clientX - $scale.offset().left - innerOffsetLeft;
            if ($handle[0] === $leftHandle[0]) {
                this.setLeftHandle(newPosition);
            }
            if ($handle[0] === $rightHandle[0]) {
                this.setRightHandle(newPosition);
            }
        },
        onMouseUp($event) {
            $event.preventDefault();
            this.$document.off('mousemove', this.bindedOnMouseMove);
            this.$document.off('mouseup', this.bindedOnMouseUp);
        },
        setLeftHandle(newHandlePosition) {
            const { scaleWidth, handleWidth, leftHandleMinPosition, maxBound } = this;
            const rightHandlePosition = this.$rightHandle.position().left;
            const validHandlePosition = _.clamp(
                newHandlePosition,
                leftHandleMinPosition,
                rightHandlePosition + 1,
            );
            this.$leftHandle
                .css('left', validHandlePosition - 1 + 'px');
            $(this.$refs.selection).css(
                'left',
                validHandlePosition + handleWidth / 2 + 'px',
            );
            const newSelectionWidth = rightHandlePosition - validHandlePosition;
            $(this.$refs.selection)
                .css('width', newSelectionWidth + 1 + 'px');
            const leftCenterPosition = validHandlePosition + handleWidth / 2;
            this.lesserValue =
                this.parse(leftCenterPosition / scaleWidth * maxBound);
        },
        setRightHandle(newHandlePosition) {
            const { scaleWidth, handleWidth, rightHandleMaxPosition, maxBound } = this;
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
            const rightCenterPosition =
                validHandlePosition + handleWidth / 2;
            this.greaterValue =
                this.parse(rightCenterPosition / scaleWidth * maxBound);
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'double-range.scss';
</style>
