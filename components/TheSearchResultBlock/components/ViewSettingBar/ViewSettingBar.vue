<template lang="pug">
    .view-setting-bar
        price-sort-toggle.view-setting-bar__cost-sort-toggle
        .view-setting-bar__view-switch
            list-view-radio
            bar-view-radio(checked="true")
</template>

<script>
import PriceSortToggle from './components/PriceSortToggle/PriceSortToggle.vue';
import ListViewRadio from './components/ListViewRadio/ListViewRadio.vue';
import BarViewRadio from './components/BarViewRadio/BarViewRadio.vue';

export default {
    components: {
        PriceSortToggle,
        ListViewRadio,
        BarViewRadio,
    },
};
</script>

<style lang="scss" scoped>
.view-setting-bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: 5px;
    padding-right: 1px;
    padding-left: 3px;

    &__cost-sort-toggle {
        margin-top: 7px;
    }

    &__view-switch {
        display: grid;
        grid-template-columns: repeat(2, auto);
        gap: 2px;
        width: 62px;
    }
}
</style>
