<template lang="pug">
    base-filter.project-filter(
        area-heading-completion="стоимости (в рублях)"
    )
        template(#filterHeading)
            span Стоимость, ₽
        template(#filterOptionBar)
            double-range
</template>

<script>
import BaseFilter from './BaseFilter/BaseFilter.vue';
import DoubleRange from './DoubleRange/DoubleRange.vue';

export default {
    components: {
        BaseFilter,
        DoubleRange,
    },
};
</script>
