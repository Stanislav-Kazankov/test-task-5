<template lang="pug">
    base-svg.svg--heart(
        width="21"
        height="18"
        view-box="0 0 21 18"
        stroke-width="2"
    )
        path.svg__path(:d="pathDefinition")
</template>

<script>
import { trimEachWord } from '@/modules/stringProcessing';

export default {
    data() {
        return {
            pathDefinition: trimEachWord(`
                m9.798 3.452.715.705.702-.718
                1.126-1.151c1.751-1.72 4.604-1.717
                6.352.006a4.361 4.361 0 0 1 0
                6.226l-8.195 8.078-8.191-8.036a4.361
                4.361 0 0 1 0-6.227C4.057.61 6.915.61
                8.665 2.335l.702-.712-.702.712
                1.133 1.117Z
            `),
        };
    },
};
</script>

<style lang="scss" scoped>
.svg--heart {
    .svg__path {
        stroke: $colorSuperLightGray;
        fill: $colorWhite;
        transition: 0.4s fill, 0.4s stroke;
    }
}
</style>
