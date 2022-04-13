<template lang="pug">
    base-toggle(
        :class="'button--list-expanding'"
        :states="states"
    )
</template>

<script>
const states = {
    on: {
        action: 'Свернуть список опций фильтра',
        caption: 'Свернуть',
    },
    off: {
        action: 'Развернуть список опций фильтра',
        caption: 'Показать все',
    },
};

export default {
    data() {
        return { states };
    },
};
</script>

<style lang="scss">
    .button--list-expanding {
        .button__core {
            position: relative;
            max-width: 94px;
            padding-right: 11px;
            font-size: 12px;
            line-height: 15px;
            color: $colorBrightBlue;

            &::before {
                content: '';
                position: absolute;
                top: 4px;
                right: 0;
                width: 5.66px;
                height: 5.66px;
                border-top: 1px solid $colorBrightBlue;
                border-left: 1px solid $colorBrightBlue;
                transform: rotate(-135deg);
                transition: transform 0.3s;
            }
        }
    }

    .is-on {
        .button__core::before {
            transform: rotate(45deg) translate(2px, 2px);
        }
    }
</style>
