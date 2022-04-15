<template lang="pug">
    base-filter(
        filterHeading="Особенности планировки"
        dativeCaseFilterHeading="особенностям планировки"
    )
        template(#filterOptionBar)
            checkbox-bar(
                :checkboxes-data="filterOptionsData"
            )
</template>

<script>
import BaseFilter from './BaseFilter/BaseFilter.vue';
import CheckboxBar from './CheckboxBar/CheckboxBar.vue';

export default {
    components: {
        BaseFilter,
        CheckboxBar,
    },
    data() {
        return {
            filterOptionsData: [
                {
                    id: '2OrMoreBathrooms',
                    caption: '2 и более санузла',
                    checked: false,
                },
                {
                    id: 'largeLoggia',
                    caption: 'Большая лоджия',
                    checked: false,
                },
                {
                    id: 'dressingRoom',
                    caption: 'Гардеробная',
                    checked: true,
                    tooltip: 'Подсказка',
                },
                {
                    id: 'kitchenLivingRoom',
                    caption: 'Кухня-гостиная',
                    checked: false,
                },
                {
                    id: 'loggia',
                    caption: 'Лоджия',
                    checked: false,
                },
                {
                    id: 'laundryRoom',
                    caption: 'Постирочная',
                    checked: false,
                },
                {
                    id: 'bedroomWithWardrobe',
                    caption: 'Спальня с гардеробом',
                    checked: false,
                },
                {
                    id: 'IRSauna',
                    caption: 'ИК-сауна',
                    checked: false,
                },
                {
                    id: 'bayWindow',
                    caption: 'Эркер',
                    checked: false,
                },
            ],
        };
    },
};
</script>
