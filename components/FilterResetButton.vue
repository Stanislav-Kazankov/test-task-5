<template lang="pug">
    base-button.button--filter-reset
</template>

<script>
export default {
    provide: {
        outerControlState: {
            description:
                'Сбросить все фильтры',
            caption: 'Сбросить все',
        },
    },
};
</script>

<style lang="scss" scoped>
.button--filter-reset {
    width: 99px;
    min-height: 20px;
    color: $colorBrightBlue;

    ::v-deep .button__core {
        font-size: 14px;
        line-height: 140%;
    }
}
</style>
