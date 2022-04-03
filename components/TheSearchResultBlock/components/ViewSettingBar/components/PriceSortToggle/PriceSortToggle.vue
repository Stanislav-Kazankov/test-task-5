<template lang="pug">
    base-toggle(
        :class="'button--cost-sort'"
        :states="states"
    )
</template>

<script>
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
    data() {
        return { states };
    },
};
</script>

<style lang="scss">
@import 'button.scss';
</style>
