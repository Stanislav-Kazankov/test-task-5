<template lang="pug">
    base-range-field.range-field--greater-value(
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
            'Максимальная цена', 'до',
        ),
    ],
};
</script>

<style lang="scss" scoped>
.range-field--greater-value {
    ::v-deep .filter-option {
        padding-left: 26px;
    }
}
</style>
