<template lang="pug">
    search-result-view-radio.selector--list-view(
        view="списка"
    )
        template(#icon)
            list-icon
</template>

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
