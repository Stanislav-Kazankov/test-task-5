<template lang="pug">
    .hover-slider
        .hover-slider__screen
            ul.hover-slider__film(ref="film")
                li.hover-slider__slide(
                    ref="slide"
                    v-for="(slide, index) in slides"
                )
                    base-image(
                        :title="`Слайд №${index} \"${slide.title}\"`"
                        :alt="slide.alt"
                        :image="slide"
                        :dimensions="dimensions"
                    )
        ul.hover-slider__pagination
            li.hover-slider__pagination-item(
                ref="paginationItems"
                v-for="(slide, index) in slides"
                @mouseenter="onPaginationMouseEnter(index)"
            )
</template>

<script>
import $ from 'jquery';
import { createArrayPropConfig } from '@/modules/propConfigs';

export default {
    props: {
        slides: createArrayPropConfig(),
    },
    data() {
        return {
            dimensions: {
                desktop: {
                    x1Width: 319,
                    canvasWidth: '319px',
                },
            },
            previousActiveSlide: 0,
        };
    },
    methods: {
        onPaginationMouseEnter(paginationItemIndex) {
            $(
                this.$refs
                    .paginationItems[this.previousActiveSlide],
            ).removeClass('is-active');
            $(this.$refs.film).css(
                'transform',
                `translateX(${
                    -$(this.$refs.slide).width() *
                    paginationItemIndex
                }px)`,
            );
            $(
                this.$refs
                    .paginationItems[paginationItemIndex],
            ).addClass('is-active');
            this.previousActiveSlide = paginationItemIndex;
        },
    },
};
</script>

<style lang="scss">
.hover-slider {
    position: relative;

    &__screen {
        display: grid;
        align-items: center;
        width: 100%;
        height: 220px;
        text-align: center;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        margin-bottom: 16px;
        overflow-y: hidden;
    }

    &__film {
        display: flex;
        transition: transform 0.5s ease-out;
    }

    &__slide {
        width: 319px;
        height: 220px;
    }

    &__pagination {
        position: absolute;
        display: flex;
        column-gap: 6px;
        width: 100%;
        height: 237px;
        padding-right: 15px;
        padding-left: 15px;

        &-item {
            flex-grow: 1;
            border-bottom: 1px solid $colorSuperLightGray;
        }
    }
}

::v-deep .image__core {
    width: 100%;
    height: 100%;
    color: $colorBlack;
    object-fit: cover;
}

.is-active {
    border-bottom-color: $colorBrightBlue;
}
</style>
