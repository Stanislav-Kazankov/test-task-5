<template lang="pug">
    .hover-slider
        .hover-slider__screen
            ul.hover-slider__film(ref="film")
                li.hover-slider__slide(
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
                v-for="slide in slides"
            )
</template>

<script>
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
        };
    },
};
</script>

<style lang="scss">
.hover-slider {
    &__screen {
        display: grid;
        align-items: center;
        width: 100%;
        height: 220px;
        text-align: center;
        margin-bottom: 16px;
        overflow-y: hidden;
    }

    &__film {
        display: flex;
    }

    &__slide {
        width: 319px;
        height: 220px;
    }

    &__pagination {
        display: flex;
        column-gap: 6px;
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
    }

    &__pagination-item {
        flex-grow: 1;
        height: 1px;
        background-color: $colorSuperLightGray;
    }
}

::v-deep .image__core {
    width: 100%;
    height: 100%;
    color: $colorBlack;
    object-fit: cover;
}
</style>
