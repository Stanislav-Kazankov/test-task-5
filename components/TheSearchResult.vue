<template lang="pug">
    section.search-result
        header.search-result__header
            .search-result__counter-bar
                h2.search-result__h2 Найдено 236 планировок
                .search-result__group
                    p.search-result__filter-counter
                        span.search-result__filter-count 0
                        span.search-result__filter-word Фильтр
                    filter-reset-button
</template>

<style lang="scss" scoped>
.search-result {
    padding-top: 30px;
    padding-right: 11px;
    padding-bottom: 37px;
    padding-left: 27px;

    &__counter-bar {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    &__h2 {
        width: 410px;
        font-size: 30px;
        line-height: 111%;
        font-weight: 600;
        color: $colorDark;
    }

    &__group {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        column-gap: 10px;
        min-width: 194px;
        max-width: 560px;
        margin-top: 12px;
    }

    &__filter-counter {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        column-gap: 4px;
        min-width: 81px;
        max-width: 117px;
    }

    &__filter-count {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 14px;
        max-width: 26px;
        height: 14px;
        padding-right: 4px;
        padding-left: 4px;
        font-size: 9px;
        line-height: 110%;
        font-weight: 500;
        white-space: nowrap;
        color: $colorWhite;
        border-radius: 7px;
        background-color: $colorGray;
        overflow: hidden;
    }

    &__filter-word {
        width: 63px;
        font-size: 16px;
        line-height: 20px;
        color: $colorDark;
    }
}
</style>
