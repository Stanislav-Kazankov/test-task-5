<template lang="pug">
    .double-range
        component(
            :is="minValueField"
            :min-number-value="minBound"
            :max-number-value="maxMinFieldNumberValue"
            @value-init="onMinFieldValueInit"
            @valid-change="onMinFieldValidChange"
        )
        component(
            :is="maxValueField"
            :min-number-value="minMaxFieldNumberValue"
            :max-number-value="maxBound"
            @value-init="onMaxFieldValueInit"
            @valid-change="onMaxFieldValidChange"
        )
        .double-range__scale
            .range__selection
            .range__handle.range__handle--left
            .range__handle.range__handle--right
</template>

<script>
import { createNumberPropConfig, createStringPropConfig } from '@/modules/propConfigs';
import toNumber from '@/modules/toNumber';

export default {
    props: {
        settedParameter:
            createStringPropConfig(),
        minBound:
            createNumberPropConfig(
                Number.MIN_VALUE,
            ),
        maxBound:
            createNumberPropConfig(
                Number.MAX_VALUE,
            ),
    },
    data() {
        return {
            minValueField: null,
            maxValueField: null,
            maxMinFieldNumberValue: this.maxBound,
            minMaxFieldNumberValue: this.minBound,
        };
    },
    created() {
        this.importField('Min');
        this.importField('Max');
    },
    methods: {
        async importField(fieldNamePrefix) {
            this[
                fieldNamePrefix.toLowerCase() +
                'ValueField'
            ] = (
                await import(
                    '../' + this.settedParameter +
                    'DoubleRange/components/' +
                    fieldNamePrefix +
                    this.settedParameter +
                    'Field.vue'
                )
            ).default;
        },
        onMinFieldValueInit(value) {
            if (value !== '') {
                this.minMaxFieldNumberValue = toNumber(value);
            }
        },
        onMaxFieldValueInit(value) {
            if (value !== '') {
                this.maxMinFieldNumberValue = toNumber(value);
            }
        },
        onMinFieldValidChange(newValue) {
            this.minMaxFieldNumberValue = toNumber(newValue);
        },
        onMaxFieldValidChange(newValue) {
            this.maxMinFieldNumberValue = toNumber(newValue);
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'double-range.scss';
</style>
