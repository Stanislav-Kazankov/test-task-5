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
@import 'hover-slider.scss';
</style>
