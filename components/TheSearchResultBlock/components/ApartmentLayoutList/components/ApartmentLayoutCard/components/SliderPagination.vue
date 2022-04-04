<template lang="pug">
    ul.slider-pagination
        li.slider-pagination__item(
            v-for="index in 5"
        )
</template>

<style lang="scss" scoped>
.slider-pagination {
    display: flex;
    width: 100%;
    column-gap: 6px;

    &__item {
        flex-grow: 1;
        height: 1px;
        background-color: $colorLightGray;
    }
}
</style>
