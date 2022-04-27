<template lang="pug">
    base-double-range(
        :toNumber="toNatural"
    )
</template>

<script>
import BaseDoubleRange from '../BaseDoubleRange/BaseDoubleRange.vue';

export default {
    components: {
        BaseDoubleRange,
    },
    methods: {
        toNatural(string) {
            return Number(
                string.replace(/\D/g, ''),
            );
        },
    },
};
</script>
