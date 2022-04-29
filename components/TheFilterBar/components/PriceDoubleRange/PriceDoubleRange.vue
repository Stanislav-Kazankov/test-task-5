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
            let result = NaN;
            const letterFreeString = string.replace(/\D/g, '');
            if (letterFreeString !== '') {
                result = Number(letterFreeString);
            }
            return result;
        },
    },
};
</script>
