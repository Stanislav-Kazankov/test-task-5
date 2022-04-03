<template lang="pug">
    ul.list.list--apartment-layout
        li.list__item(
            v-for="(layout, index) in apartmentLayouts"
        )
            nuxt-link.list__link(to="d")
                apartment-layout-card(
                    :apartmentLayout="layout"
                )
</template>

<script>
import ApartmentLayoutCard from './components/ApartmentLayoutCard/ApartmentLayoutCard.vue';

export default {
    components: {
        ApartmentLayoutCard,
    },
    data() {
        return {
            apartmentLayouts: [
                {
                    image: {
                        desktop: {
                            notWebp: [
                                {
                                    caption: '1',
                                    url: '/oblique-apartment-layout@1x.png',
                                },
                                {
                                    caption: '1.5',
                                    url: '/oblique-apartment-layout@1.5x.png',
                                },
                                {
                                    caption: '2',
                                    url: '/oblique-apartment-layout@2x.png',
                                },
                                {
                                    caption: '3',
                                    url: '/oblique-apartment-layout@3x.png',
                                },
                                {
                                    caption: '4',
                                    url: '/oblique-apartment-layout@4x.png',
                                },
                            ],
                            webp: [
                                {
                                    caption: '1',
                                    url: '/oblique-apartment-layout@1x.webp',
                                },
                                {
                                    caption: '1.5',
                                    url: '/oblique-apartment-layout@1.5x.webp',
                                },
                                {
                                    caption: '2',
                                    url: '/oblique-apartment-layout@2x.webp',
                                },
                                {
                                    caption: '3',
                                    url: '/oblique-apartment-layout@3x.webp',
                                },
                                {
                                    caption: '4',
                                    url: '/oblique-apartment-layout@4x.webp',
                                },
                            ],
                        },
                    },
                    type: 'Студия',
                    area: 27,
                    housingСomplex: 'ЖК Ёлки-Park',
                    apartmentCount: 12,
                    minPrice: 3.5,
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.list--apartment-layout {
    row-gap: 17px;
    column-gap: 8px;
    width: 975px;
}

.list {
    &__item {
        width: 319px;
        height: 342px;
        transition: 0.4s transform;

        &:hover {
            z-index: 1;
            transform: translateY(-6px);
        }
    }

    &__link {
        z-index: 100;
        display: grid;
    }
}
</style>
