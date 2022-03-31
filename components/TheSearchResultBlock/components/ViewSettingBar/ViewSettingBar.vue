<template lang="pug">
    .view-setting-bar
        cost-sort-toggle.view-setting-bar__cost-sort-toggle
        .view-setting-bar__radios
            list-view-radio
            bar-view-radio(checked="true")
</template>

<script>
import CostSortToggle from './components/CostSortToggle/CostSortToggle.vue';
import ListViewRadio from './components/ListViewRadio/ListViewRadio.vue';
import BarViewRadio from './components/BarViewRadio/BarViewRadio.vue';

export default {
    components: {
        CostSortToggle,
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

    &__radios {
        display: grid;
        grid-template-columns: repeat(2, auto);
        gap: 2px;
        width: 62px;
    }
}
</style>
