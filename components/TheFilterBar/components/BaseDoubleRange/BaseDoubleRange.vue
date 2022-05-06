<template lang="pug">
    .double-range
        lesser-value-field(
            :min-value="minBound"
            :max-value="greaterValue"
            :value="lesserValue"
            @trigger-value-update="onTriggerLesserValueUpdate"
        )
        greater-value-field(
            :min-value="lesserValue"
            :max-value="maxBound"
            :value="greaterValue"
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
            createNumberPropConfig(
                null,
            ),
        initialGreaterValue:
            createNumberPropConfig(
                null,
            ),
    },
    data() {
        return {
            $document: null,
            lesserValue: this.minBound,
            greaterValue: this.maxBound,
            maxLesserValue: this.maxBound,
            minGreaterValue: this.minBound,
            handleBar: null,
        };
    },
    created() {
        this.lesserValue = this.initialLesserValue || this.minBound;
        this.greaterValue = this.initialGreaterValue || this.maxBound;
    },
    methods: {
        onTriggerLesserValueUpdate(newValue) {
            this.lesserValue = newValue;
            if (this.handleBar) {
                this.handleBar.autoSetLeftHandle(newValue);
            }
        },
        onTriggerGreaterValueUpdate(newValue) {
            this.greaterValue = newValue;
            if (this.handleBar) {
                this.handleBar.autoSetRightHandle(newValue);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'double-range.scss';
</style>
