<template lang="pug">
    base-filter.room-count-filter(
        filterHeading="Количество комнат"
        dativeCaseFilterHeading="количеству комнат"
    )
        template(#filterOptionBar)
            filter-option-list(
                :filter-options-data="\
                    filterOptions\
                "
            )
</template>

<script>
import BaseFilter from './BaseFilter/BaseFilter.vue';
import FilterOptionList from './FilterOptionList/FilterOptionList.vue';

export default {
    components: {
        BaseFilter,
        FilterOptionList,
    },
    data() {
        return {
            filterOptions: [
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
    .room-count-filter {
        ::v-deep .filter-option {
            padding-right: 5px;
            padding-left: 5px;
        }
    }
</style>
