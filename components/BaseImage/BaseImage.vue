<template lang="pug">
    picture.image
        source(
            v-for="(srcSet, index) in webpSrcSets"
            :media="medias[index]"
            :srcset="srcSet"
            :sizes="canvasWidths[index]"
            type="image/webp"
        )
        source(
            v-for="(srcSet, index) in restNotWebpSrcSets"
            :media="medias[index]"
            :srcset="srcSet"
            :sizes="canvasWidths[index]"
        )
        img.image__core(
            ref="core"
            v-bind="$attrs"
            :class="{\
                'h-erase-background-color':\
                imageLoaded\
            }"
            :src="src"
            :srcset="zeroNotWebpSrcSet"
            :sizes="src !== '#' ? lastCanvasWidth : false"
            @load="\
                imageLoaded=\
                    $refs.core\
                        ? $refs.core.naturalWidth > 1\
                        : false\
            "
        )
</template>

<script>
import { toRefs } from '@nuxtjs/composition-api';
import { useMedias } from './composables/medias';
import { useSrcSets } from './composables/srcSets';
import { useCanvasWidths } from './composables/canvasWidths';
import devices from '@/modules/devices';
import { createObjectPropConfig } from '@/modules/propConfigs';

export default {
    inheritAttrs: false,
    props: {
        image: createObjectPropConfig(),
        dimensions: createObjectPropConfig(),
    },
    setup(props) {
        const { image, dimensions } = toRefs(props);
        const medias = useMedias(dimensions.value);
        const src = dimensions.value[devices[0]]
            ? process.env.baseURL +
                image.value[devices[0]]
                    .notWebp[0].url
            : '#';
        const {
            zeroNotWebpSrcSet, restNotWebpSrcSets,
            webpSrcSets,
        } = useSrcSets(
            image.value, dimensions.value,
        );
        const {
            canvasWidths, lastCanvasWidth,
        } = useCanvasWidths(dimensions.value);
        return {
            medias,
            src,
            zeroNotWebpSrcSet,
            restNotWebpSrcSets,
            webpSrcSets,
            canvasWidths,
            lastCanvasWidth,
        };
    },
    data() {
        return {
            imageLoaded: false,
        };
    },
};
</script>

<style lang="scss" scoped>
    @import 'image.scss';
</style>
