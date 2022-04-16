<template lang="pug">
    p.field
        label.field__label
            base-control
            input.field__input(
                ref="input"
                v-bind="$attrs"
                type="text"
                required
                pattern="\\d*"
                inputmode="numeric"
                @change="onChange"
            )
</template>

<script>
import $ from 'jquery';

export default {
    inheritAttrs: false,
    data() {
        return {
            $input: null,
        };
    },
    mounted() {
        this.$input = $(this.$refs.input);

        this.$input.prop(
            'previousValue',
            this.$input.prop('value'),
        );
    },
    methods: {
        onChange() {
            if (!this.$refs.input.checkValidity()) {
                this.$input.prop(
                    'value',
                    this.$input.prop('previousValue'),
                );
            } else {
                this.$input.prop(
                    'previousValue',
                    this.$input.prop('value'),
                );
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .field__label {
        display: flex;
        column-gap: 5px;
        height: 33px;
        padding-right: 8px;
        padding-left: 8px;
        border: 1px solid $colorSuperLightGray;

        &__screed {
            display: grid;
            grid-template: 100% / 100%;
        }
    }
</style>
