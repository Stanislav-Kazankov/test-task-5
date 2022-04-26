<template lang="pug">
    base-number-field(
        :max-number-value="minNumberValue"
        :min-number-value="maxNumberValue"
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
