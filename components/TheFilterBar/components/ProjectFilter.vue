<template lang="pug">
    base-filter.project-filter(
        area-heading-completion="проекту"
        selection-object="проект"
        selection-space="карте"
        :is-selection-button-enabled="\
            !!filterOptionsData.length\
        "
    )
        template(#filterHeading)
            span Проект
        template(#filterOptionBar)
            filter-option-list(
                :filter-options-data="\
                    filterOptionsData\
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
            filterOptionsData: [
                {
                    id: 'znak',
                    caption: 'ZNAK',
                    checked: false,
                    icon: {
                        relativeUrl: '/logo-znak.png',
                        width: 16,
                        height: 16,
                        backgroundColorBeforeLoading: '#53378a',
                    },
                },
                {
                    id: 'onLomonosovStreet',
                    caption: 'На Ломоносова',
                    checked: false,
                    icon: {
                        relativeUrl: '/logo-on-lomonosov-street.png',
                        width: 14,
                        height: 14,
                        backgroundColorBeforeLoading: '#e83a22',
                    },
                },
                {
                    id: 'сornflowers',
                    caption: 'Васильки',
                    checked: false,
                    icon: {
                        relativeUrl: '/logo-сornflowers.png',
                        width: 16,
                        height: 16,
                        backgroundColorBeforeLoading: '#7084bd',
                    },
                },
                {
                    id: 'onKalininStreet',
                    caption: 'На Калинина',
                    checked: false,
                    icon: {
                        relativeUrl: '/logo-on-kalinin-street.png',
                        width: 14,
                        height: 14,
                        backgroundColorBeforeLoading: '#b83a7C',
                    },
                },
            ],
        };
    },
};
</script>
