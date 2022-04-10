<template lang="pug">
    section.filter-bar
        h2.visually-hidden
            | Панель фильтров поиска
        h3.filter-bar__filter-heading
            | Количество комнат
        filter-item-list(:filter-items="roomCountFilterCaptions")
</template>

<style lang="scss" scoped>
.filter-bar {
    padding-top: 42px;
    padding-right: 33px;
    padding-bottom: 41px;
    padding-left: 15px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: $colorWhite;

    &__filter-heading {
        font-size: 16px;
        line-height: 20px;
        font-weight: 600;
        color: $colorDark;
    }
}
</style>
