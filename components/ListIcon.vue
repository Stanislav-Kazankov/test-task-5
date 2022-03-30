<template lang="pug">
    base-svg.svg--list-icon(
        width="24"
        height="24"
    )
        mask.svg__mask(id="a")
            path(
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4 4h16v4H4V4Zm0 6h16v4H4v-4Zm16 6H4v4h16v-4Z"
            )
        path.svg__path(
            :d="pathDefinition"
            mask="url(#a)"
        )
</template>

<script>
import { trimEachWord } from '@/modules/stringProcessing';

export default {
    data() {
        return {
            pathDefinition: trimEachWord(`
                M20 4h1V3h-1v1ZM4 4V3H3v1h1Zm16
                4v1h1V8h-1ZM4 8H3v1h1V8Zm16
                2h1V9h-1v1ZM4 10V9H3v1h1Zm16
                4v1h1v-1h-1ZM4 14H3v1h1v-1Zm0
                2v-1H3v1h1Zm16 0h1v-1h-1v1ZM4
                20H3v1h1v-1Zm16
                0v1h1v-1h-1Zm0-17H4v2h16V3Zm1
                5V4h-2v4h2ZM4 9h16V7H4v2ZM3
                4v4h2V4H3Zm17
                5H4v2h16V9Zm1 5v-4h-2v4h2ZM4
                15h16v-2H4v2Zm-1-5v4h2v-4H3Zm1
                7h16v-2H4v2Zm1
                3v-4H3v4h2Zm15-1H4v2h16v-2Zm-1-3v4h2v-4h-2Z
            `),
        };
    },
};
</script>

<style lang="scss" scoped>
.svg--list-icon {
    .svg__mask {
        fill: $colorWhite;
    }

    .svg__path {
        fill: $colorLightGray;
        transition: 0.5s fill;
    }
}
</style>
