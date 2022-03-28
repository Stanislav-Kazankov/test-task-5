<template lang="pug">
    base-button.button--filter-reset
</template>

<script>
export default {
    provide: {
        outerControlState: {
            description:
                'Сбросить все фильтры',
            caption: {
                text: 'Сбросить все',
            },
        },
    },
};
</script>

<style lang="scss" scoped>
.button--filter-reset {
    width: 99px;
    font-size: 14px;
    line-height: 140%;
    color: $colorBrightBlue;

    ::v-deep .base-control {
        font-size: 14px;
    }
}
</style>
