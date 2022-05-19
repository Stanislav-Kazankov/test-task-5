<template lang="pug">
    base-range-field.range-field--lesser-value(
        :min-value="minValue"
        :max-value="maxValue"
        :value="value"
        :is-value-change-blocked="isValueChangeBlocked"
    )
</template>

<script>
import definePriceFieldOptions from './definePriceFieldOptions.js';

export default {
    mixins: [
        definePriceFieldOptions(
            'Минимальная цена', 'от',
        ),
    ],
};
</script>

<style lang="scss" scoped>
.range-field--lesser-value {
    ::v-deep .control {
        width: 13.08px;
    }
}
</style>
