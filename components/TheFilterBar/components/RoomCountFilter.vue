<template lang="pug">
    filter-item-list.list--room-counts(
        :filter-items="roomCountFilterItems"
    )
</template>

<script>
import FilterItemList from './FilterItemList.vue';

export default {
    components: {
        FilterItemList,
    },
    data() {
        return {
            roomCountFilterItems: [
                {
                    id: 'c',
                    caption: 'C',
                    checked: false,
                },
                {
                    id: '1',
                    caption: '1',
                    checked: false,
                },
                {
                    id: '1plus',
                    caption: '1+',
                    checked: false,
                },
                {
                    id: '2',
                    caption: '2',
                    checked: false,
                },
                {
                    id: '2plus',
                    caption: '2+',
                    checked: false,
                },
                {
                    id: '3',
                    caption: '3',
                    checked: false,
                },
                {
                    id: '3plus',
                    caption: '3+',
                    checked: false,
                },
                {
                    id: '4more',
                    caption: '4...',
                    checked: false,
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
    .list--room-counts {
        ::v-deep .filter-item {
            width: 33px;
            padding-right: 5px;
            padding-left: 5px;
        }
    }
</style>
