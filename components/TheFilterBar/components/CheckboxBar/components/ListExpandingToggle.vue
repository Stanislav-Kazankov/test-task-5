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
</style>
