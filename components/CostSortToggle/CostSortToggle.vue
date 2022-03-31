<template lang="pug">
    base-toggle.button--cost-sort(
        :states="states"
        @click.native="onToggleClick"
    )
</template>

<script>
import { ref, provide } from '@nuxtjs/composition-api';

const states = {
    on: {
        action: 'Отсортировать список квартир по возрастанию цены',
        caption: 'Сначала дешевле',
    },
    off: {
        action: 'Отсортировать список квартир по убыванию цены',
        caption: 'Сначала дороже',
    },
};

export default {
    setup() {
        const isOrderAscending = ref(true);
        const outerToggleState = {
            isOff: ref(isOrderAscending),
        };
        provide(
            'outerToggleState',
            outerToggleState,
        );
        return {
            isOrderAscending,
        };
    },
    data() {
        return { states };
    },
    methods: {
        onToggleClick() {
            this.isOrderAscending = !this
                .isOrderAscending;
        },
    },
};
</script>

<style lang="scss">
@import 'button.scss';
</style>
