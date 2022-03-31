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
                    list-view-radio()
                    bar-view-radio(checked="true")
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
@import 'search-result-block.scss';
</style>
