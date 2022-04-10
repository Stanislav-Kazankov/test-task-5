<template lang="pug">
    article.apartment-layout-card
        .apartment-layout-card__top
            apartment-layout-image.apartment-layout-card__image(
                :image="slides[slides.length - 1]"
            )
        hover-slider.apartment-layout-card__slider(
            :slides="slides"
        )
        .apartment-layout-card__bottom
            .apartment-layout-card__screed
                h3.apartment-layout-card__heading
                    span.visually-hidden
                        | Планировка №{{apartmentLayoutIndex}}
                    | {{type}}, {{area}} м
                    span.apartment-layout-card__superscript 2
                favorites-precense-toggle.apartment-layout-card__favorites-toggle(
                    @click.native.stop.prevent
                )
            p.apartment-layout-card__p.apartment-layout-card__p--housing-complex
                | {{housingСomplex}}
            p.apartment-layout-card__p.apartment-layout-card__p--apartment-info
                span.apartment-layout-card__apartment-info
                    | {{apartmentCount}} квартир
                span(aria-hidden="true")
                    | ·
                span.apartment-layout-card__apartment-info
                    | от {{minPrice.toLocaleString()}} млн ₽
            p.apartment-layout-card__choosing-button
                | выбери свою
</template>

<script>
import ApartmentLayoutImage from './components/ApartmentLayoutImage.vue';
import HoverSlider from './components/HoverSlider/HoverSlider.vue';
import FavoritesPrecenseToggle from './components/FavoritesPresenceToggle/FavoritesPresenceToggle.vue';
import { createNumberPropConfig, createObjectPropConfig } from '@/modules/propConfigs';

export default {
    components: {
        ApartmentLayoutImage,
        HoverSlider,
        FavoritesPrecenseToggle,
    },
    props: {
        apartmentLayout:
            createObjectPropConfig(),
        apartmentLayoutIndex:
            createNumberPropConfig(),
    },
    setup(props) {
        return props.apartmentLayout;
    },
};
</script>

<style lang="scss" scoped>
@import 'apartment-layout-card.scss';
</style>
