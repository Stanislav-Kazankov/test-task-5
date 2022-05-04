<template lang="pug">
    p.range-field
        label.filter-option
            base-control
            input.filter-option__input(
                ref="input"
                type="text"
                required
                :value="formattedValue"
                @change="onChange"
            )
</template>

<script>
import $ from 'jquery';
import { createNumberPropConfig } from '@/modules/propConfigs';

export default {
    inject: {
        toNumber: {
            default: () =>
                stringFieldValue => {
                    let result = NaN;
                    if (stringFieldValue) {
                        const letterFreeString =
                            stringFieldValue.replace(/\D/g, '');
                        if (letterFreeString !== '') {
                            result = Number(letterFreeString);
                        }
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
