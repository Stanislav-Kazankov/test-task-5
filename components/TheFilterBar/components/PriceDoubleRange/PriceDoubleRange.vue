<template lang="pug">
    base-double-range(
        :min-bound="0"
        :max-bound="10"
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
