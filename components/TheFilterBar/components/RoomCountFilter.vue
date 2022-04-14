<template lang="pug">
    filter-option-list.list--room-counts(
        :filter-option-data-array="\
            roomCountFilterOptions\
        "
    )
</template>

<script>
import FilterOptionList from './FilterOptionList/FilterOptionList.vue';

export default {
    components: {
        FilterOptionList,
    },
    data() {
        return {
            roomCountFilterOptions: [
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
                    id: '1Plus',
                    caption: '1+',
                    checked: false,
                },
                {
                    id: '2',
                    caption: '2',
                    checked: false,
                },
                {
                    id: '2Plus',
                    caption: '2+',
                    checked: false,
                },
                {
                    id: '3',
                    caption: '3',
                    checked: false,
                },
                {
                    id: '3Plus',
                    caption: '3+',
                    checked: false,
                },
                {
                    id: '4OrMore',
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
        ::v-deep .filter-option {
            width: 33px;
            padding-right: 5px;
            padding-left: 5px;
        }
    }
</style>
