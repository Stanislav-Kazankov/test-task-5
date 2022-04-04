<template lang="pug">
    article.apartment-layout-card
        apartment-layout-image.apartment-layout-card__image(
            :image="image"
        )
        slider-pagination.apartment-layout-card__slider-pagination
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
import SliderPagination from './components/SliderPagination.vue';
import FavoritesPrecenseToggle from './components/FavoritesPresenceToggle/FavoritesPresenceToggle.vue';
import { createNumberPropConfig, createObjectPropConfig } from '@/modules/propConfigs';

export default {
    components: {
        ApartmentLayoutImage,
        SliderPagination,
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
    .apartment-layout-card {
        display: grid;
        justify-items: left;
        align-content: start;
        width: 319px;
        min-height: 342px;
        padding: 15px;
        text-align: left;
        border-radius: 4px;
        background-color: $colorWhite;

        &__image {
            justify-self: center;
            margin-bottom: 42px;
        }

        &__slider-pagination {
            display: none;
            margin-bottom: 12px;
        }

        &__screed {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            width: 100%;
            margin-bottom: -6px;
        }

        &__heading {
            max-width: 228px;
            min-height: 26px;
            font-size: 22px;
            line-height: 26px;
            font-weight: 600;
            color: $colorDark;
            margin-top: 5px;
            margin-bottom: 7px;
        }

        &__favorites-toggle {
            display: none;
            margin-right: -8px;
        }

        .is-on {
            display: grid;
        }

        &__superscript {
            vertical-align: super;
            font-size: 14px;
            line-height: 13px;
        }

        &__p {
            min-height: 20px;
            line-height: 140%;

            &--housing-complex {
                margin-bottom: 6px;
            }

            &--apartment-info {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                width: 100%;
                column-gap: 5.5px;
                margin-bottom: 0;
            }
        }

        &__apartment-info {
            max-width: calc(50% - 7.5px);
        }

        &__choosing-button {
            display: none;
            width: 100%;
            min-height: 50px;
            padding-top: 18px;
            padding-right: 17px;
            padding-bottom: 17px;
            padding-left: 17px;
            font-size: 12px;
            line-height: 15px;
            font-weight: 500;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            text-align: center;
            color: $colorBlack;
            border-radius: 2px;
            background-color: $colorLightBlue;
        }
    }

    .apartment-layout-card:hover {
        min-height: 413px;
        box-shadow: 0 0 15px $colorDarkGray, 0 25px 15px -15px $colorDarkGray;

        .apartment-layout-card {
            &__image {
                margin-bottom: 29px;
            }

            &__slider-pagination {
                display: flex;
            }

            &__screed {
                margin-bottom: -6px;
            }

            &__heading {
                color: $colorBrightBlue;
            }

            &__favorites-toggle {
                display: grid;
            }

            &__p--apartment-info {
                margin-bottom: 20px;
            }

            &__choosing-button {
                display: grid;
            }
        }
    }
</style>
