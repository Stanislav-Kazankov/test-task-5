<template lang="pug">
    .double-range
        min-value-field(
            :min-number-value="minBound"
            :max-number-value="maxMinFieldNumberValue"
            :value="minFieldValue"
            @trigger-value-update="onMinFieldTriggerUpdate"
        )
        max-value-field(
            :min-number-value="minMaxFieldNumberValue"
            :max-number-value="maxBound"
            :value="maxFieldValue"
            @trigger-value-update="onMaxFieldTriggerUpdate"
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
            minFieldValue: String(this.minBound),
            maxFieldValue: String(this.maxBound),
            maxMinFieldNumberValue: this.minBound,
            minMaxFieldNumberValue: this.maxBound,
        };
    },
    methods: {
        onMinFieldTriggerUpdate(newProcessedValue) {
            this.minFieldValue = newProcessedValue;
            this.minMaxFieldNumberValue =
                this.toNumber(this.minFieldValue);
        },
        onMaxFieldTriggerUpdate(newProcessedValue) {
            this.maxFieldValue = newProcessedValue;
            this.maxMinFieldNumberValue =
                this.toNumber(this.maxFieldValue);
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'double-range.scss';
</style>
