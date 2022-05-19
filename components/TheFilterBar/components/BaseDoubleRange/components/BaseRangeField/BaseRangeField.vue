<template lang="pug">
    p.range-field
        label.range-field__label
            base-control
            input.filter-option(
                ref="input"
                type="text"
                required
                :value="formattedValue"
                @click="$refs.input.select();"
                @change="onChange"
            )
</template>

<script>
import $ from 'jquery';
import { createNumberPropConfig, falsePropConfig } from '@/modules/propConfigs';

export default {
    inject: {
        toNumber: {
            default: () =>
                stringFieldValue => {
                    let result = NaN;
                    if (stringFieldValue) {
                        const letterFreeString =
                            stringFieldValue.replace(/(?!^-)\D+/g, '');
                        result = letterFreeString
                            ? Number(letterFreeString)
                            : result;
                    }
                    return result;
                },
        },
    },
    props: {
        minValue: createNumberPropConfig(
            Number.NEGATIVE_INFINITY,
        ),
        maxValue: createNumberPropConfig(
            Number.POSITIVE_INFINITY,
        ),
        value: createNumberPropConfig(),
        isValueChangeBlocked: falsePropConfig,
    },
    data() {
        return {
            $input: null,
            validity: null,
        };
    },
    computed: {
        formattedValue() {
            return this.value.toLocaleString();
        },
    },
    mounted() {
        this.$input = $(this.$refs.input);
        this.$input.prop('previousValue', this.value);
        this.$parent
            .$emit('trigger-value-update', this.value);
        this.validity = this.$input.prop('validity');
    },
    methods: {
        onChange() {
            if (!this.isValueChangeBlocked) {
                const newValue = this.toNumber(
                    this.$input.val(),
                );
                this.$parent
                    .$emit('trigger-value-update', newValue);
                this.$forceUpdate();
                if (this.validity.valueMissing || isNaN(newValue)) {
                    this.$parent.$emit(
                        'trigger-value-update',
                        this.$input.prop('previousValue'),
                    );
                } else {
                    this.correctFieldValue(newValue);
                }
            } else {
                this.$forceUpdate();
            }
        },
        correctFieldValue(newValue) {
            if (newValue < this.minValue) {
                newValue = this.minValue;
                this.$parent
                    .$emit('trigger-value-update', newValue);
            } else if (newValue > this.maxValue) {
                newValue = this.maxValue;
                this.$parent
                    .$emit('trigger-value-update', newValue);
            } else {
                this.$input.prop('previousValue', newValue);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'range-field.scss';
</style>
