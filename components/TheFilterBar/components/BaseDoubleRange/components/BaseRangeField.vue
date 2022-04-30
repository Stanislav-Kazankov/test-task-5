<template lang="pug">
    p.range-field
        label.filter-option
            base-control
            input.filter-option__input(
                ref="input"
                type="text"
                required
                :value="processedValue"
                @change="onChange"
            )
</template>

<script>
import $ from 'jquery';
import { createNumberPropConfig, createStringPropConfig } from '@/modules/propConfigs';

export default {
    inject: {
        toNumber: {
            default:
                value => Number(value),
        },
    },
    props: {
        minNumberValue:
            createNumberPropConfig(
                Number.NEGATIVE_INFINITY,
            ),
        maxNumberValue:
            createNumberPropConfig(
                Number.POSITIVE_INFINITY,
            ),
        value:
            createStringPropConfig(),
    },
    data() {
        return {
            $input: null,
            validity: null,
        };
    },
    computed: {
        processedValue() {
            const result = this.toNumber(this.value)
                .toLocaleString();
            this.$parent
                .$emit('trigger-change', result);
            return result;
        },
    },
    mounted() {
        this.$input = $(this.$refs.input);
        this.$input.prop(
            'previousValue',
            this.$input.val(),
        );
        this.$parent.$emit(
            'trigger-change',
            this.toNumber(this.$input.val())
                .toLocaleString(),
        );
        this.validity = this
            .$input.prop('validity');
    },
    methods: {
        onChange() {
            this.$parent.$emit(
                'trigger-change',
                this.$input.val(),
            );
            const newNumberValue = this.toNumber(
                this.$input.val(),
            );
            if (this.validity.valueMissing || isNaN(newNumberValue)) {
                this.$parent.$emit(
                    'trigger-change',
                    this.$input.prop('previousValue'),
                );
            } else {
                this.correctFieldValue(newNumberValue);
            }
        },
        correctFieldValue(newNumberValue) {
            const newValue =
                newNumberValue.toLocaleString();
            if (newNumberValue < this.minNumberValue) {
                newNumberValue = this.minNumberValue;
                this.$parent
                    .$emit('trigger-change', newValue);
            } else if (newNumberValue > this.maxNumberValue) {
                newNumberValue = this.maxNumberValue;
                this.$parent
                    .$emit('trigger-change', newValue);
            } else {
                this.$input
                    .prop('previousValue', newValue);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'range-field.scss';
</style>
