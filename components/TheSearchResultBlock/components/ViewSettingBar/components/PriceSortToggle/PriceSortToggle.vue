<template lang="pug">
    base-toggle(
        :class="'button--cost-sort'"
        :states="states"
        @click.native="onToggleClick"
    )
</template>

<script>
import { ref, provide } from '@nuxtjs/composition-api';

const states = {
    on: {
        action: 'Отсортировать список квартир по возрастанию цены',
        caption: 'Сначала дороже',
    },
    off: {
        action: 'Отсортировать список квартир по убыванию цены',
        caption: 'Сначала дешевле',
    },
};

export default {
    setup() {
        const isOrderDescending = ref(false);
        const outerToggleState = {
            isOn: ref(isOrderDescending),
        };
        provide(
            'outerToggleState',
            outerToggleState,
        );
        return {
            isOrderDescending,
        };
    },
    data() {
        return { states };
    },
    methods: {
        onToggleClick() {
            this.isOrderDescending = !this
                .isOrderDescending;
        },
    },
};
</script>

<style lang="scss">
@import 'button.scss';
</style>
