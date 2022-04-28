<template lang="pug">
    p.number-field
        label.filter-option
            base-control
            input.filter-option__input(
                ref="input"
                v-bind="$attrs"
                type="text"
                required
                @change="onChange"
            )
</template>

<script>
import $ from 'jquery';
import { createNumberPropConfig } from '@/modules/propConfigs';

export default {
    inject: {
        toNumber: {
            default:
                value => Number(value),
        },
    },
    inheritAttrs: false,
    props: {
        minNumberValue:
            createNumberPropConfig(
                Number.NEGATIVE_INFINITY,
            ),
        maxNumberValue:
            createNumberPropConfig(
                Number.POSITIVE_INFINITY,
            ),
    },
    data() {
        return {
            $input: null,
            validity: null,
        };
    },
    mounted() {
        this.$input = $(this.$refs.input);
        this.$input.prop(
            'previousValue',
            this.$input.val(),
        );
        this.$parent.$emit(
            'trigger-change',
            this.toNumber(this.$input.val()),
        );
        this.validity = this.$input.prop('validity');
    },
    methods: {
        onChange() {
            if (this.validity.valueMissing) {
                this.$parent.$emit(
                    'trigger-change',
                    this.toNumber(
                        this.$input.prop('previousValue'),
                    ),
                );
            } else {
                this.correctFieldValue();
                this.$input.prop(
                    'previousValue',
                    this.$input.val(),
                );
            }
        },
        correctFieldValue() {
            let newNumberValue = this.toNumber(
                this.$input.val(),
            );
            this.$parent.$emit(
                'trigger-change',
                newNumberValue,
            );
            if (newNumberValue < this.minNumberValue) {
                newNumberValue = this.minNumberValue;
            } else if (newNumberValue > this.maxNumberValue) {
                newNumberValue = this.maxNumberValue;
            }
            this.$parent.$emit(
                'trigger-change',
                newNumberValue,
            );
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
