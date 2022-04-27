<template lang="pug">
    .double-range
        min-value-field(
            :min-number-value="minBound"
            :max-number-value="maxMinFieldNumberValue"
            @value-init="onMinFieldValueInit"
            @valid-change="onMinFieldValidChange"
        )
        max-value-field(
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
import { provide } from '@nuxtjs/composition-api';
import MinValueField from './components/MinValueField.vue';
import MaxValueField from './components/MaxValueField.vue';
import { createNumberPropConfig, createFunctionPropConfig } from '@/modules/propConfigs';

export default {
    components: {
        MinValueField,
        MaxValueField,
    },
    props: {
        minBound:
            createNumberPropConfig(
                Number.MIN_VALUE,
            ),
        maxBound:
            createNumberPropConfig(
                Number.MAX_VALUE,
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
            maxMinFieldNumberValue: this.maxBound,
            minMaxFieldNumberValue: this.minBound,
        };
    },
    methods: {
        onMinFieldValueInit(value) {
            if (value !== '') {
                this.minMaxFieldNumberValue = this.toNumber(value);
            }
        },
        onMaxFieldValueInit(value) {
            if (value !== '') {
                this.maxMinFieldNumberValue = this.toNumber(value);
            }
        },
        onMinFieldValidChange(newValue) {
            this.minMaxFieldNumberValue = this.toNumber(newValue);
        },
        onMaxFieldValidChange(newValue) {
            this.maxMinFieldNumberValue = this.toNumber(newValue);
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'double-range.scss';
</style>
