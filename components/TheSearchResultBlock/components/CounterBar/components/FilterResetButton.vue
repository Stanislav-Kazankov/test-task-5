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
    ::v-deep .button__core {
        width: 99px;
        min-height: 20px;
        line-height: 140%;
        color: $colorBrightBlue;
    }
}
</style>
