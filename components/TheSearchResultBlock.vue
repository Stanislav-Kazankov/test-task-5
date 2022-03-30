<template lang="pug">
    section.search-result-block
        .search-result-block__bar
            .search-result-block__counter-bar
                h2.search-result-block__h2 Найдено 236 планировок
                .search-result-block__group
                    p.search-result-block__filter-counter
                        span.search-result-block__filter-count 0
                        span.search-result-block__filter-word Фильтр
                    filter-reset-button.search-result-block__filter-reset-button
            ul.search-result-block__filter-items.list.list--filter-items
                li.list__item.filter-item(
                    v-for="\
                        (filterItemCaption, index)\
                            in selectedFilterItemCaptions\
                    "
                    :key="index"
                )
                    | {{filterItemCaption}}
            .search-result-block__view-setting-bar
                cost-sort-toggle
                .search-result-block__radios
                    list-view-radio
                    bar-view-radio
</template>

<script>
export default {
    data() {
        return {
            selectedFilterItemCaptions: [
                'До 50 м²',
                'Готовое жилье',
                'Два санузла',
                'Балкон',
                'Дом сдан',
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.search-result-block {
    padding-top: 30px;
    padding-right: 11px;
    padding-bottom: 37px;
    padding-left: 27px;

    &__counter-bar {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 15px;
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
        align-items: flex-start;
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
        background-color: $colorLightGray;
        overflow: hidden;
    }

    &__filter-word {
        width: 63px;
        font-size: 16px;
        line-height: 20px;
        color: $colorDark;
    }

    &__filter-reset-button {
        margin-top: 1px;
    }

    &__filter-items {
        padding-left: 4px;
        margin-bottom: 26px;
    }

    &__view-setting-bar {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-left: 2px;
    }

    &__radios {
        display: grid;
        grid-template-columns: repeat(2, auto);
        gap: 2px;
        width: 62px;
    }
}
</style>
