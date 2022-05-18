<template lang="pug">
    section.filter-bar
        h2.visually-hidden
            | Панель фильтров поиска
        room-count-filter
        layout-feature-filter
        project-filter
        price-filter
</template>

<script>
import RoomCountFilter from './components/RoomCountFilter.vue';
import LayoutFeatureFilter from './components/LayoutFeatureFilter.vue';
import ProjectFilter from './components/ProjectFilter.vue';
import PriceFilter from './components/PriceFilter.vue';

export default {
    components: {
        RoomCountFilter,
        LayoutFeatureFilter,
        ProjectFilter,
        PriceFilter,
    },
};
</script>

<style lang="scss" scoped>
.filter-bar {
    display: flex;
    flex-direction: column;
    row-gap: 27px;
    padding-top: 42px;
    padding-right: 33px;
    padding-bottom: 41px;
    padding-left: 16px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: $colorWhite;
}
</style>
