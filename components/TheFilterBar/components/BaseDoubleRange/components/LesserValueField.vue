<template lang="pug">
    base-range-field(
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
