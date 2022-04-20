<template lang="pug">
    base-filter(
        area-heading-completion="стоимости (в рублях)"
    )
        template(#filterHeading)
            span Стоимость, ₽
        template(#filterOptionBar)
            price-double-range
</template>

<script>
import BaseFilter from './BaseFilter/BaseFilter.vue';
import PriceDoubleRange from './PriceDoubleRange/PriceDoubleRange.vue';

export default {
    components: {
        BaseFilter,
        PriceDoubleRange,
    },
};
</script>
