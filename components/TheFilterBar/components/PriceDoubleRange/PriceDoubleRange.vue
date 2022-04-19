<template lang="pug">
    .range
        min-price-field(
            :min-value="minBound"
            :max-value="maxMinFieldValue"
            @value-init="onMinFieldValueInit"
            @valid-change="onMinFieldValidChange"
        )
        max-price-field(
            :min-value="minMaxFieldValue"
            :max-value="maxBound"
            @value-init="onMaxFieldValueInit"
            @valid-change="onMaxFieldValidChange"
        )
        .range__scale
            .range__selection
            .range__handle.range__handle--left
            .range__handle.range__handle--right
</template>

<script>
import MinPriceField from './components/MinPriceField.vue';
import MaxPriceField from './components/MaxPriceField.vue';

export default {
    components: {
        MinPriceField,
        MaxPriceField,
    },
    data() {
        return {
            minBound: 0,
            maxBound: 100000000,
            maxMinFieldValue: null,
            minMaxFieldValue: null,
        };
    },
    methods: {
        onMaxFieldValueInit(value) {
            this.maxMinFieldValue = value;
        },
        onMinFieldValueInit(value) {
            this.minMaxFieldValue = value;
        },
        onMaxFieldValidChange(newValue) {
            this.maxMinFieldValue = newValue;
        },
        onMinFieldValidChange(newValue) {
            this.minMaxFieldValue = newValue;
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
