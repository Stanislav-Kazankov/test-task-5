<template lang="pug">
    ul.slide-pagination
        li.slide-pagination__item(
            v-for="index in 5"
        )
</template>

<style lang="scss" scoped>
.slide-pagination {
    display: flex;
    width: 100%;
    column-gap: 6px;
    margin-bottom: 17px;

    &-item {
        flex-grow: 1;
        height: 1px;
        background-color: $colorLightGray;
    }
}
</style>
