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
import { inject } from '@nuxtjs/composition-api';

export default {
    inheritAttrs: false,
    setup() {
        const outerStateDefault = {
            minValue: Number.MIN_VALUE,
            maxValue: Number.MAX_VALUE,
        };
        const outerFieldState = inject(
            'outerFieldState',
            outerStateDefault,
        );

        return outerFieldState;
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
            this.$input.prop('value'),
        );
        this.$parent.$parent.$emit(
            'value-init',
            parseFloat(this.$input.prop('value')),
        );
        this.validity = this.$input.prop('validity');
    },
    methods: {
        onChange() {
            if (
                this.validity.patternMismatch ||
                this.validity.valueMissing
            ) {
                this.$input.prop(
                    'value',
                    this.$input.prop('previousValue'),
                );
            } else {
                this.validateForOutOfRange();
                this.$input.prop(
                    'previousValue',
                    this.$input.prop('value'),
                );
                this.emitValidChangeEvent();
            }
        },
        validateForOutOfRange() {
            if (this.$input.prop('value') < this.minValue) {
                this.$input.prop('value', this.minValue);
            } else if (this.$input.prop('value') > this.maxValue) {
                this.$input.prop('value', this.maxValue);
            }
        },
        emitValidChangeEvent() {
            this.$parent.$parent.$emit(
                'valid-change',
                parseFloat(this.$input.prop('value')),
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
