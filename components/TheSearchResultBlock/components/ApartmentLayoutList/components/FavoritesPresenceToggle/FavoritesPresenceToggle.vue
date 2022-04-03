<template lang="pug">
    base-toggle(
        :class="'button--favorites-precense'"
        :states="states"
    )
        template(#icon)
            heart-icon
</template>

<script>
import HeartIcon from './components/HeartIcon.vue';

const states = {
    on: {
        action: 'Удалить из избранного',
    },
    off: {
        action: 'Добавить в избранное',
    },
};

export default {
    components: {
        HeartIcon,
    },
    data() {
        return { states };
    },
};
</script>

<style lang="scss" scoped>
@import 'button.scss';
</style>
