<template lang="pug">
    section.filter-bar
        h2.visually-hidden
            | Панель фильтров поиска
        article.filter-bar__filter
            h3.filter-bar__filter-heading
                span.visually-hidden
                    | Фильтр по количеству комнат
                span(aria-hidden="true")
                    | Количество комнат
            room-count-filter.filter-bar__room-count-filter
        article.filter-bar__filter
            h3.filter-bar__filter-heading
                span.visually-hidden
                    | Фильтр по особенностям планировки
                span(aria-hidden="true")
                    | Особенности планировки
            layout-feature-filter.filter-bar__layout-feature-filter
</template>

<script>
import RoomCountFilter from './components/RoomCountFilter.vue';
import LayoutFeatureFilter from './components/LayoutFeatureFilter.vue';

export default {
    components: {
        RoomCountFilter,
        LayoutFeatureFilter,
    },
};
</script>

<style lang="scss" scoped>
.filter-bar {
    display: flex;
    flex-direction: column;
    padding-top: 42px;
    padding-right: 33px;
    padding-bottom: 41px;
    padding-left: 15px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: $colorWhite;

    &__filter {
        display: flex;
        flex-direction: column;
    }

    &__filter-heading {
        font-size: 16px;
        line-height: 20px;
        font-weight: 600;
        margin-bottom: 7px;
    }

    &__room-count-filter {
        margin-bottom: 26px;
        margin-left: 1px;
    }

    &__layout-feature-filter {
        margin-top: 1px;
        margin-left: 1px;
    }
}
</style>
