<template lang="pug">
    p.field
        label.field__label
            base-control
            input.field__input(
                ref="input"
                v-bind="$attrs"
                type="text"
                pattern="\\d*"
                inputmode="numeric"
                @change="onInputChange"
                :value="initialValue"
            )
</template>

<script>
import $ from 'jquery';
import { createNaturalPropConfig } from '~/modules/propConfigs';

export default {
    inheritAttrs: false,
    props: {
        initialValue:
            createNaturalPropConfig(),
    },
    data() {
        return {
            previousValue: this.initialValue,
        };
    },
    methods: {
        onInputChange($event) {
            const $target = $($event.target);
            if (!$target.prop('validity').valid) {
                $target.prop('value', this.previousValue);
            } else {
                this.previousValue = $target
                    .prop('value');
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
