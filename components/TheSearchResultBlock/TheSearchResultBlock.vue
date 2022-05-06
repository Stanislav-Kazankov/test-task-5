<template lang="pug">
    section.search-result-block
        .search-result-block__control-panel
            counter-bar.search-result-block__counter-bar
            filter-option-list.search-result-block__filter-items(
                :filter-options-data="\
                    filterOptions\
                "
            )
            view-setting-bar
        apartment-layout-list
</template>

<script>
import CounterBar from './components/CounterBar/CounterBar.vue';
import ViewSettingBar from './components/ViewSettingBar/ViewSettingBar.vue';
import ApartmentLayoutList from './components/ApartmentLayoutList/ApartmentLayoutList.vue';

export default {
    components: {
        CounterBar,
        ViewSettingBar,
        ApartmentLayoutList,
    },
    data() {
        return {
            filterOptions: [
                {
                    id: 'lessThen50SquareMeters',
                    caption: 'До 50 м²',
                    checked: false,
                },
                {
                    id: 'readyMadeHousing',
                    caption: 'Готовое жилье',
                    checked: false,
                },
                {
                    id: 'twoBathrooms',
                    caption: 'Два санузла',
                    checked: false,
                },
                {
                    id: 'balcony',
                    caption: 'Балкон',
                    checked: false,
                },
                {
                    id: 'theHouseIsRented',
                    caption: 'Дом сдан',
                    checked: false,
                },
            ],
        };
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
