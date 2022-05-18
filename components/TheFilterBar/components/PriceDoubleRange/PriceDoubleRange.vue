<template lang="pug">
    base-double-range(
        :min-bound="2354000"
        :max-bound="3700000"
    )
</template>

<script>
import BaseDoubleRange from '../BaseDoubleRange/BaseDoubleRange.vue';

export default {
    components: {
        BaseDoubleRange,
    },
};
</script>
