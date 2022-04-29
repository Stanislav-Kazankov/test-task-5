<template lang="pug">
    base-double-range(
        :toNumber="toNatural"
        :min-bound="10"
        :max-bound="11"
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
