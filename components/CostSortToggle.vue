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
    .button--cost-sort {
        max-width: 145px;
        min-height: 17px;

        .button__core {
            position: relative;
            padding-right: 14px;
            font-size: 14px;
            line-height: 17px;

            &::before {
                content: '';
                position: absolute;
                top: calc(50% - 4.5px);
                right: 0;
                width: 5px;
                height: 5px;
                border-bottom: 1px solid $colorGray;
                border-right: 1px solid $colorGray;
                transform: rotate(-135deg);
            }

            &::after {
                content: '';
                position: absolute;
                bottom: calc(50% - 4.5px);
                right: 0;
                width: 5px;
                height: 5px;
                border-bottom: 1px solid $colorGray;
                border-right: 1px solid $colorGray;
                transform: rotate(45deg);
            }
        }
    }
</style>
