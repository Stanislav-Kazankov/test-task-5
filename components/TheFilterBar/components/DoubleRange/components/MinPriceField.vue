<template lang="pug">
    base-numeric-field(
        :min="minPossiblePrice"
        :max="maxPossiblePrice"
    )
</template>

<script>
import definePriceFieldOtions from '@/mixins/definePriceFieldOptions';

export default {
    mixins: [
        definePriceFieldOtions(
            'Минимальная цена', 'от',
        ),
    ],
};
</script>
