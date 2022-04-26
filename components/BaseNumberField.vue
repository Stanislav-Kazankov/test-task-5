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
import toNumber from '@/modules/toNumber';

export default {
    inheritAttrs: false,
    setup() {
        const outerStateDefault = {
            minNumberValue: Number.MIN_VALUE,
            maxNumberValue: Number.MAX_VALUE,
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
            this.$input.val(),
        );
        this.$parent.$emit(
            'value-init',
            Number(this.$input.val()),
        );
        this.validity = this.$input.prop('validity');
    },
    methods: {
        onChange() {
            if (this.validity.valueMissing) {
                this.$input.val(
                    this.$input.prop('previousValue'),
                );
            } else {
                this.correctFieldValue();
                this.$input.prop(
                    'previousValue',
                    this.$input.val(),
                );
                this.emitValidChangeEvent();
            }
        },
        correctFieldValue() {
            let fieldNumberValue = toNumber(
                this.$input.val(),
            );
            if (fieldNumberValue < this.minNumberValue) {
                fieldNumberValue = this.minNumberValue;
            } else if (fieldNumberValue > this.maxNumberValue) {
                fieldNumberValue = this.maxNumberValue;
            }
            this.$input.val(
                fieldNumberValue.toLocaleString(),
            );
        },
        emitValidChangeEvent() {
            this.$parent.$emit(
                'valid-change',
                this.$input.prop('value'),
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
