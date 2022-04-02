<template lang="pug">
    ul.list.list--apartment-layout
        li.list__item(
            v-for="({\
                image, type, area, housingСomplex,\
                apartmentCount, minPrice,\
            }, index)\
                in apartmentLayouts\
            "
        )
            nuxt-link.list__link(to="")
                article.list__apartment-layout-card
                    apartment-layout-image.list__apartment-layout-image(
                        :image="image"
                    )
                    ul.list__slide-pagination
                        li.list__slide-pagination-item(
                            v-for="index in 6"
                        )
                    h3.list__heading {{type}}, {{area}} м
                        span.list__superscript 2
                    p.list__p.list__p--housing-complex
                        | {{housingСomplex}}
                    p.list__p.list__p--apartment-info
                        | {{apartmentCount}} квартир &thinsp;·
                        | &thinsp;от {{minPrice.toLocaleString()}}
                        | млн.&thinsp;₽
                    base-button.list__layout-choosing-button
</template>

<script>
import ApartmentLayoutImage from './components/ApartmentLayoutImage.vue';

export default {
    components: {
        ApartmentLayoutImage,
    },
    provide: {
        outerControlState: {
            description:
                'Перейти на страницу выбора своей планировки',
            caption: 'выбери свою',
        },
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
                                    url: '//oblique-apartment-layout@1x.png',
                                },
                                {
                                    caption: '1.5',
                                    url: '//oblique-apartment-layout@1.5x.png',
                                },
                                {
                                    caption: '2',
                                    url: '//oblique-apartment-layout@2x.png',
                                },
                                {
                                    caption: '3',
                                    url: '//oblique-apartment-layout@3x.png',
                                },
                                {
                                    caption: '4',
                                    url: '//oblique-apartment-layout@4x.png',
                                },
                            ],
                            webp: [
                                {
                                    caption: '1',
                                    url: '//oblique-apartment-layout@1x.webp',
                                },
                                {
                                    caption: '1.5',
                                    url: '//oblique-apartment-layout@1.5x.webp',
                                },
                                {
                                    caption: '2',
                                    url: '//oblique-apartment-layout@2x.webp',
                                },
                                {
                                    caption: '3',
                                    url: '//oblique-apartment-layout@3x.webp',
                                },
                                {
                                    caption: '4',
                                    url: '//oblique-apartment-layout@4x.webp',
                                },
                            ],
                        },
                    },
                    type: 'Студия',
                    area: 27,
                    apartmentCount: 12,
                    minPrice: 3.5,
                },
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
                {
                    image: {
                        desktop: {
                            notWebp: [
                                {
                                    caption: '1',
                                    url: '//oblique-apartment-layout@1x.png',
                                },
                                {
                                    caption: '1.5',
                                    url: '//oblique-apartment-layout@1.5x.png',
                                },
                                {
                                    caption: '2',
                                    url: '//oblique-apartment-layout@2x.png',
                                },
                                {
                                    caption: '3',
                                    url: '//oblique-apartment-layout@3x.png',
                                },
                                {
                                    caption: '4',
                                    url: '//oblique-apartment-layout@4x.png',
                                },
                            ],
                            webp: [
                                {
                                    caption: '1',
                                    url: '//oblique-apartment-layout@1x.webp',
                                },
                                {
                                    caption: '1.5',
                                    url: '//oblique-apartment-layout@1.5x.webp',
                                },
                                {
                                    caption: '2',
                                    url: '//oblique-apartment-layout@2x.webp',
                                },
                                {
                                    caption: '3',
                                    url: '//oblique-apartment-layout@3x.webp',
                                },
                                {
                                    caption: '4',
                                    url: '//oblique-apartment-layout@4x.webp',
                                },
                            ],
                        },
                    },
                    type: 'Студия',
                    area: 27,
                    apartmentCount: 12,
                    minPrice: 3.5,
                },
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
    // &__item:hover {
    //     width: 319px;
    //     height: 342px;
    //     transition: 0.4s transform;
    // }

    &__link {
        z-index: 100;
        display: grid;
    }

    &__apartment-layout-card {
        display: grid;
        justify-items: left;
        align-content: start;
        width: 319px;
        min-height: 342px;
        padding: 15px;
        border-radius: 4px;
        background-color: $colorWhite;
    }

    &__apartment-layout-image {
        justify-self: center;
        margin-bottom: 41px;
    }

    &__heading {
        min-height: 33px;
        font-size: 22px;
        line-height: 26px;
        font-weight: 600;
        color: $colorDark;
    }

    &__superscript {
        vertical-align: super;
        font-size: 14px;
    }

    &__p {
        min-height: 20px;
        line-height: 140%;

        &--housing-complex {
            margin-bottom: 8px;
        }

        &--apartment-info {
            margin-bottom: 0;
        }
    }

    &__layout-choosing-button {
        display: none;
        width: 100%;
        min-height: 50px;

        ::v-deep .button__core {
            padding-top: 18px;
            padding-right: 17px;
            padding-bottom: 17px;
            padding-left: 17px;
            font-weight: 500;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            color: $colorBlack;
            background-color: $colorLightBlue;
        }
    }

    &__item {
        z-index: 1;
        transform: translateY(-6px);

        .list {
            &__apartment-layout-card {
                min-height: 413px;
                box-shadow: 0 0 15px $colorDarkGray, 0 25px 15px -15px $colorDarkGray;
            }

            &__apartment-layout-image {
                margin-bottom: 14px;
            }

            &__heading {
                color: $colorBrightBlue;
            }

            &__p--apartment-info {
                margin-bottom: 20px;
            }

            &__layout-choosing-button {
                display: flex;
            }
        }
    }
}
</style>
