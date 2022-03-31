<template lang="pug">
    search-result-view-radio.selector--list-view(
        view="списка"
        v-bind="$attrs"
    )
        template(#icon)
            list-icon
</template>

<script>
export default {
    inheritAttrs: false,
};
</script>

<style lang="scss" scoped>
.selector--list-view {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}

::v-deep .selector__input:checked {
    ~ .svg {
        .svg__path {
            fill: $colorDark;
        }
    }
}
</style>
