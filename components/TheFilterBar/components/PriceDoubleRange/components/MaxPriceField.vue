<template lang="pug">
    base-natural-field
</template>

<script>
import definePriceFieldOtions from './definePriceFieldOptions.js';

export default {
    mixins: [
        definePriceFieldOtions(
            'Максимальная цена', 'до',
        ),
    ],
};
</script>
