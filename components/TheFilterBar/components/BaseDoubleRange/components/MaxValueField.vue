<template lang="pug">
    base-range-field(
        v-bind="$attrs"
        :min-number-value="minNumberValue"
        :max-number-value="maxNumberValue"
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
