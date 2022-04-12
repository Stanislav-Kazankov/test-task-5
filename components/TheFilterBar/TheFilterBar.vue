<template lang="pug">
    section.filter-bar
        h2.visually-hidden
            | Панель фильтров поиска
        h3.filter-bar__filter-heading
            | Количество комнат
        room-count-filter.filter-bar__room-count-filter
        h3.filter-bar__filter-heading
            | Особенности планировки
</template>

<script>
import RoomCountFilter from './components/RoomCountFilter.vue';

export default {
    components: {
        RoomCountFilter,
    },
};
</script>

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
        margin-bottom: 7px;
    }

    &__room-count-filter {
        margin-bottom: 26px;
        margin-left: 1px;
    }
}
</style>
