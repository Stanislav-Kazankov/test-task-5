<template lang="pug">
    base-svg.svg--bar-icon(
        width="24"
        height="24"
    )
        path.svg__path(:d="pathDefinition")
</template>

<script>
import { trimEachWord } from '@/modules/stringProcessing';

export default {
    data() {
        return {
            pathDefinition: trimEachWord(`
                M4.5 4.5h6v6h-6zM13.5 4.5h6v6h-6zM4.5
                13.5h6v6h-6zM13.5 13.5h6v6h-6z
            `),
        };
    },
};
</script>

<style lang="scss" scoped>
.svg--bar-icon {
    fill: none;

    .svg__path {
        stroke: $colorLightGray;
        transition: 0.5s stroke;
    }
}
</style>
