<template lang="pug">
    base-toggle(
        :class="{\
            'button--favorites-precense': true,\
            'is-on': isThereInFavorites\
        }"
        :states="states"
        @click.native="onToggleClick"
    )
        template(#icon)
            heart-icon
</template>

<script>
import { ref, provide } from '@nuxtjs/composition-api';
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
    setup() {
        const isThereInFavorites = ref(false);
        const outerToggleState = {
            isOn: ref(isThereInFavorites),
        };
        provide(
            'outerToggleState',
            outerToggleState,
        );
        return {
            isThereInFavorites,
        };
    },
    data() {
        return { states };
    },
    methods: {
        onToggleClick() {
            this.isThereInFavorites = !this
                .isThereInFavorites;
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'button.scss';
</style>
