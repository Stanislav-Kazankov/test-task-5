<template lang="pug">
    search-result-view-radio.selector--bar-view(
        view="сетки"
    )
        template(#icon)
            bar-icon
</template>

<script>
export default {
    provide: {
        outerControlState: {
            description: 'Отобразить результаты поиска в виде сетки',
        },
    },
};
</script>

<style lang="scss" scoped>
.selector--bar-view {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
}

::v-deep .selector__input:checked {
    ~ .svg {
        .svg__path {
            stroke: $colorDark;
        }
    }
}
</style>
