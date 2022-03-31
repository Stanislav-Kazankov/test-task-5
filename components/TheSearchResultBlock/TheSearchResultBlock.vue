<template lang="pug">
    section.search-result-block
        .search-result-block__control-panel
            counter-bar.search-result-block__counter-bar
            filter-item-list.search-result-block__filter-items
            view-setting-bar
</template>

<script>
import CounterBar from './components/CounterBar/CounterBar.vue';
import FilterItemList from './components/FilterItemList.vue';
import ViewSettingBar from './components/ViewSettingBar/ViewSettingBar.vue';

export default {
    components: {
        CounterBar,
        FilterItemList,
        ViewSettingBar,
    },
};
</script>

<style lang="scss" scoped>
    .search-result-block {
        padding-top: 30px;
        padding-right: 15px;
        padding-bottom: 37px;
        padding-left: 27px;

        &__control-panel {
            margin-bottom: 8px;
        }

        &__counter-bar {
            margin-bottom: 15px;
        }

        &__filter-items {
            padding-left: 4px;
            margin-bottom: 20px;
        }
    }
</style>
