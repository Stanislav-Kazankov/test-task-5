<template lang="pug">
    .range
        component(
            :is="minValueField"
            :min-value="minBound"
            :max-value="maxMinFieldValue"
            @value-init="onMinFieldValueInit"
            @valid-change="onMinFieldValidChange"
        )
        component(
            :is="maxValueField"
            :min-value="minMaxFieldValue"
            :max-value="maxBound"
            @value-init="onMaxFieldValueInit"
            @valid-change="onMaxFieldValidChange"
        )
        .range__scale
            .range__selection
            .range__handle.range__handle--left
            .range__handle.range__handle--right
</template>

<script>
import { createStringPropConfig } from '@/modules/propConfigs';

export default {
    props: {
        settedParameter:
            createStringPropConfig(),
    },
    data() {
        return {
            minValueField: null,
            maxValueField: null,
            minBound: 0,
            maxBound: 100000000,
            maxMinFieldValue: null,
            minMaxFieldValue: null,
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
        onMaxFieldValueInit(value) {
            this.maxMinFieldValue = value;
        },
        onMinFieldValueInit(value) {
            this.minMaxFieldValue = value;
        },
        onMaxFieldValidChange(newValue) {
            this.maxMinFieldValue = newValue;
        },
        onMinFieldValidChange(newValue) {
            this.minMaxFieldValue = newValue;
        },
    },
};
</script>

<style lang="scss">
@import 'double-range.scss';
</style>
