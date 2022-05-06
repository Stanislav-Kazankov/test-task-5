<template lang="pug">
    base-filter.filter--room-count(
        area-heading-completion="количеству комнат"
    )
        template(#filterHeading)
            span Количество комнат
        template(#filterOptionBar)
            filter-option-list(
                :filter-options-data="\
                    filterOptions\
                "
            )
</template>

<script>
import BaseFilter from './BaseFilter/BaseFilter.vue';

export default {
    components: {
        BaseFilter,
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
    .filter--room-count {
        ::v-deep .filter-option {
            padding-right: 5px;
            padding-left: 5px;
        }
    }
</style>
