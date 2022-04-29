<template lang="pug">
    p.number-field
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
            this.$parent.$emit(
                'trigger-change',
                result,
            );
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
                this.$input.prop(
                    'previousValue',
                    this.$input.val(),
                );
            }
        },
        correctFieldValue(newNumberValue) {
            if (newNumberValue < this.minNumberValue) {
                newNumberValue = this.minNumberValue;
                this.$parent.$emit(
                    'trigger-change',
                    newNumberValue.toLocaleString(),
                );
            } else if (newNumberValue > this.maxNumberValue) {
                newNumberValue = this.maxNumberValue;
                this.$parent.$emit(
                    'trigger-change',
                    newNumberValue.toLocaleString(),
                );
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.number-field {
    .filter-option {
        align-items: stretch;
        gap: 0;
        padding-top: 0;
        padding-right: 7px;
        padding-bottom: 0;
        padding-left: 5px;

        &__input {
            width: 100%;
        }
    }

    .control {
        align-self: center;
        width: 19px;
        color: $colorGray;
    }
}
</style>
