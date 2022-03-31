<template lang="pug">
    search-result-view-radio.selector--bar-view(
        view="сетки"
        v-bind="$attrs"
    )
        template(#icon)
            bar-icon
</template>

<script>
export default {
    inheritAttrs: false,
};
</script>

<style lang="scss" scoped>
.selector--bar-view {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
}

::v-deep .selector__input:checked {
    ~ .svg {
        .svg__path {
            stroke: $colorDark;
        }
    }
}
</style>
