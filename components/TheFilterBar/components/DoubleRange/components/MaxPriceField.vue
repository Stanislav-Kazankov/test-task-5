<template lang="pug">
    base-natural-field(
        ref="baseNaturalField"
        :min="minPossiblePrice"
        :max="maxPossiblePrice"
    )
</template>

<script>
import definePriceFieldOtions from '@/mixins/definePriceFieldOptions';

export default {
    mixins: [
        definePriceFieldOtions(
            'Максимальная цена', 'до',
        ),
    ],
};
</script>
