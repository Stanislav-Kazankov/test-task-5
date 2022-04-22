<template lang="pug">
    base-number-field
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
