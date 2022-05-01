<template lang="pug">
    .double-range
        lesser-value-field(
            :min-number-value="minBound"
            :max-number-value="maxLesserValue"
            :value="stringLesserValue"
            @trigger-value-update="onLesserValueTriggerUpdate"
        )
        greater-value-field(
            :min-number-value="minGreaterValue"
            :max-number-value="maxBound"
            :value="stringGreaterValue"
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
import { provide } from '@nuxtjs/composition-api';
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
        toNumber:
            createFunctionPropConfig(
                value => Number(value),
            ),
    },
    setup({ toNumber }) {
        provide('toNumber', toNumber);
    },
    data() {
        return {
            $document: null,
            lesserValue: this.minBound,
            greaterValue: this.maxBound,
            stringLesserValue: String(this.lesserValue),
            stringGreaterValue: String(this.greaterValue),
            maxLesserValue: this.maxBound,
            minGreaterValue: this.minBound,
            $leftHandle: null,
            $rightHandle: null,
            scaleWidth: null,
            handleWidth: null,
        };
    },
    mounted() {
        this.$document = $(document);
        this.scaleWidth = $(this.$refs.scale).width();
        this.$leftHandle = $(this.$refs.leftHandle);
        this.$rightHandle = $(this.$refs.rightHandle);
        this.handleWidth = this.$leftHandle.width();
    },
    methods: {
        bindedOnMouseUp: () => {},
        bindedOnMouseMove: () => {},
        onLesserValueTriggerUpdate(newValue) {
            this.stringLesserValue = newValue;
            this.lesserValue =
                this.toNumber(this.stringLesserValue);
            this.minGreaterValue = this.lesserValue;
        },
        onGreaterValueTriggerUpdate(newValue) {
            this.stringGreaterValue = newValue;
            this.greaterValue =
                this.toNumber(this.stringGreaterValue);
            this.maxLesserValue = this.greaterValue;
        },
        onHandleMouseDown($event) {
            const $target = $($event.target);
            const innerOffsetLeft =
                $event.clientX - $target.position().left;
            this.bindedOnMouseMove = this.onHandleMouseMove
                .bind(null, $target, innerOffsetLeft);
            this.$document.on('mousemove', this.bindedOnMouseMove);
            this.bindedOnMouseUp = this.onMouseUp.bind(this);
            this.$document.on('mouseup', this.bindedOnMouseUp);
        },
        onHandleMouseMove($handle, innerOffsetLeft, $event) {
            $event.preventDefault();
            const newPosition = $event.clientX - innerOffsetLeft;
            if ($handle[0] === this.$leftHandle[0]) {
                this.setLeftHandle(newPosition);
            }
            if ($handle[0] === this.$rightHandle[0]) {
                this.setRightHandle(newPosition);
            }
            this.correctHandlePositions($handle);
        },
        onMouseUp($event) {
            $event.preventDefault();
            this.$document.off('mousemove', this.bindedOnMouseMove);
            this.$document.off('mouseup', this.bindedOnMouseUp);
        },
        setLeftHandle(newHandlePosition) {
            const { scaleWidth, handleWidth } = this;
            const leftHandleMaxPosition = scaleWidth - handleWidth / 2;
            const rightHandlePosition = this.$rightHandle.position().left;
            const validHandlePosition = _.clamp(
                newHandlePosition,
                -this.handleWidth / 2,
                leftHandleMaxPosition,
            );
            this.$leftHandle
                .css('left', String(validHandlePosition) + 'px');
            $(this.$refs.selection).css(
                'left',
                String(validHandlePosition + handleWidth / 2 + 1) + 'px',
            );
            const newSelectionWidth = rightHandlePosition - validHandlePosition;
            $(this.$refs.selection)
                .css('width', String(newSelectionWidth) + 'px');
            const leftCenterPosition = validHandlePosition + handleWidth / 2;
            this.lesserValue =
                leftCenterPosition / scaleWidth * this.maxBound;
            this.stringLesserValue = this.lesserValue.toLocalString();
        },
        setRightHandle(newHandlePosition) {
            const { scaleWidth, handleWidth } = this;
            const rightHandleMaxPosition = this.scaleWidth - handleWidth / 2;
            const leftHandlePosition = this.$leftHandle.position().left;
            const validHandlePosition = _.clamp(
                newHandlePosition,
                leftHandlePosition,
                rightHandleMaxPosition,
            );
            this.$rightHandle
                .css('left', String(validHandlePosition) + 'px');
            const newSelectionWidth = validHandlePosition - leftHandlePosition;
            $(this.$refs.selection)
                .css('width', String(newSelectionWidth) + 'px');
            const rightCenterPosition =
                validHandlePosition + handleWidth / 2;
            this.highValue =
                rightCenterPosition / scaleWidth * this.maxBound;
        },
        correctHandlePositions($handle) {
            const leftHandlePosition = this.$leftHandle.offset().left;
            const { handleWidth } = this;
            const rightHandlePosition = this.$rightHandle.offset().left;

            if (leftHandlePosition + handleWidth >= rightHandlePosition) {
                if ($handle === this.$leftHandle) {
                    const newRightHandlePosition = leftHandlePosition + handleWidth;
                    this.setRightPin(newRightHandlePosition);
                }
                if ($handle === this.$rightHandle) {
                    // не удается правильно "пододвинуть" левый ползунок,
                    // двигая правый (хотя наоборот - получается)
                    // при изменении свойства leftPin.style.left в методе setLeftPin()
                    // более трех раз подряд свойство leftPin.offsetLeft
                    // перестает изменяться

                    // this.setLeftPin(leftPinPosition - 1);
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'double-range.scss';
</style>
