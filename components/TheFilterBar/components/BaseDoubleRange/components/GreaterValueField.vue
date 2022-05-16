<template lang="pug">
    base-range-field(
        :min-value="minValue"
        :max-value="maxValue"
        :value="value"
        :isChangeBlocked="isChangeBlocked"
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
