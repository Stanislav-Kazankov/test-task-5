<template lang="pug">
    div(:class="'counter-bar'")
        h2.counter-bar__h2 Найдено 236 планировок
        .counter-bar__group
            p.counter-bar__filter-counter
                span.counter-bar__filter-count 0
                span.counter-bar__filter-word Фильтр
            filter-reset-button.counter-bar__filter-reset-button
</template>

<script>
import FilterResetButton from './components/FilterResetButton.vue';

export default {
    components: {
        FilterResetButton,
    },
};
</script>

<style lang="scss" scoped>
.counter-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    &__h2 {
        width: 410px;
        font-size: 30px;
        line-height: 111%;
        font-weight: 600;
        color: $colorDark;
    }

    &__group {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        column-gap: 10px;
        min-width: 189px;
        max-width: 560px;
        margin-top: 12px;
    }

    &__filter-counter {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        column-gap: 4px;
        min-width: 81px;
        max-width: 117px;
    }

    &__filter-count {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 14px;
        max-width: 26px;
        height: 14px;
        padding-right: 4px;
        padding-left: 4px;
        font-size: 9px;
        line-height: 110%;
        font-weight: 500;
        white-space: nowrap;
        color: $colorWhite;
        border-radius: 7px;
        background-color: $colorLightGray;
        overflow: hidden;
    }

    &__filter-word {
        width: 63px;
        font-size: 16px;
        line-height: 20px;
        color: $colorDark;
    }

    &__filter-reset-button {
        margin-top: 1px;
    }
}
</style>
