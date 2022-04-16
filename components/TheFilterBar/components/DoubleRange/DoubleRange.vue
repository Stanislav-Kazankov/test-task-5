<template lang="pug">
    .range
        min-price-field(
            ref="minPriceField"
            @hook:mounted="onMinFieldMounted"
            @change.native="onMinFieldChange"
        )
        max-price-field(
            ref="maxPriceField"
            @hook:mounted="onMaxFieldMounted"
            @change.native="onMaxFieldChange"
        )
        .range__scale
            .range__selection
            .range__handle.range__handle--left
            .range__handle.range__handle--right
</template>

<script>
import $ from 'jquery';
import MinPriceField from './components/MinPriceField.vue';
import MaxPriceField from './components/MaxPriceField.vue';

export default {
    components: {
        MinPriceField,
        MaxPriceField,
    },
    data() {
        return {
            minPriceInput: null,
            maxPriceInput: null,
        };
    },
    methods: {
        onMinFieldMounted() {
            this.$minPriceInput = $(
                this.$refs.minPriceField
                    .$refs.baseNaturalField
                    .$refs.input,
            );
        },
        onMaxFieldMounted() {
            this.$maxPriceInput = $(
                this.$refs.maxPriceField
                    .$refs.baseNaturalField
                    .$refs.input,
            );
        },
        onMinFieldChange() {
            if (
                parseInt(this.$minPriceInput.prop('value'), 10) >
                parseInt(this.$maxPriceInput.prop('value'), 10)
            ) {
                this.$minPriceInput.prop(
                    'value',
                    this.$maxPriceInput.prop('value'),
                );
            }
        },
        onMaxFieldChange() {
            if (
                parseInt(this.$minPriceInput.prop('value'), 10) >
                parseInt(this.$maxPriceInput.prop('value'), 10)
            ) {
                this.$maxPriceInput.prop(
                    'value',
                    this.$minPriceInput.prop('value'),
                );
            }
        },
    },
};
</script>

<style lang="scss">
    .range {
        display: flex;
        flex-direction: column;
        min-height: 200px;
        margin: auto;

        .line {
            position: relative;
            height: 1px;
            background-color: $colorSuperLightGray;
            margin: auto;
        }

        .selection {
            position: absolute;
            top: 0;
            left: 10px;
            width: 80px;
            height: 100%;
            background-color: $colorDark;
        }

        .handle {
            position: absolute;
            top: -8px;
            left: 10px;
            width: 16px;
            height: 16px;
            border: 1px solid $colorSuperLightGray;
            border-radius: 50%;
            background-color: $colorWhite;
            cursor: pointer;
        }

        .right-pin {
            left: 70px;
        }

        .output {
            min-width: 20px;
            padding: 10px;
            border: 2px solid $colorBlack;
            margin: 20px auto;
        }
    }
</style>
