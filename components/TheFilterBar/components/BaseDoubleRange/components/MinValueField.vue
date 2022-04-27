<template lang="pug">
    base-number-field(
        :min-number-value="minNumberValue"
        :max-number-value="maxNumberValue"
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
