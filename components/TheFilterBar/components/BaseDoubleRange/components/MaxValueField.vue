<template lang="pug">
    base-range-field(
        :min-number-value="minNumberValue"
        :max-number-value="maxNumberValue"
        :value="value"
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
