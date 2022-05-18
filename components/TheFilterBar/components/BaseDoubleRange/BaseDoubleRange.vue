<template lang="pug">
    .double-range
        lesser-value-field(
            :min-value="minBound"
            :max-value="greaterValue"
            :value="lesserValue"
            :isValueChangeBlocked="isValueChangeBlocked"
            @trigger-value-update="onTriggerLesserValueUpdate"
        )
        greater-value-field(
            :min-value="lesserValue"
            :max-value="maxBound"
            :value="greaterValue"
            :isValueChangeBlocked="isValueChangeBlocked"
            @trigger-value-update="onTriggerGreaterValueUpdate"
        )
        handle-bar(
            ref="handleBar"
            :min-bound="minBound"
            :max-bound="maxBound"
            :lesser-value="lesserValue"
            :greater-value="greaterValue"
            @hook:mounted="handleBar = $refs.handleBar"
            @trigger-lesser-value-update="lesserValue = $event"
            @trigger-greater-value-update="greaterValue = $event"
            @trigger-value-change-block="isValueChangeBlocked = true"
            @trigger-value-change-unblock="isValueChangeBlocked = false"
        )
</template>

<script>
import LesserValueField from './components/LesserValueField.vue';
import GreaterValueField from './components/GreaterValueField.vue';
import HandleBar from './components/HandleBar/HandleBar.vue';
import { createNumberPropConfig } from '@/modules/propConfigs';

export default {
    components: {
        LesserValueField,
        GreaterValueField,
        HandleBar,
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
            createNumberPropConfig(null),
        initialGreaterValue:
            createNumberPropConfig(null),
    },
    data() {
        return {
            $document: null,
            lesserValue: this.minBound,
            greaterValue: this.maxBound,
            maxLesserValue: this.maxBound,
            minGreaterValue: this.minBound,
            isValueChangeBlocked: false,
            handleBar: null,
        };
    },
    created() {
        this.lesserValue = this.initialLesserValue || this.minBound;
        this.greaterValue = this.initialGreaterValue || this.maxBound;
    },
    methods: {
        onTriggerLesserValueUpdate(newValue) {
            const oldValue = this.lesserValue;
            this.lesserValue = newValue;
            if (this.handleBar) {
                if (
                    newValue !== oldValue &&
                    oldValue > this.minBound && newValue > this.minBound
                ) {
                    this.handleBar
                        .transitLeftHandle(newValue);
                }
            }
        },
        onTriggerGreaterValueUpdate(newValue) {
            const oldValue = this.greaterValue;
            this.greaterValue = newValue;
            if (this.handleBar) {
                if (
                    newValue !== oldValue &&
                    oldValue < this.maxBound && newValue < this.maxBound
                ) {
                    this.handleBar
                        .transitRightHandle(newValue);
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'double-range.scss';
</style>
