<template lang="pug">
    p.apartment-layout-image
        base-image(
            :title="image.title"
            :alt="image.alt"
            :image="image"
            :dimensions="dimensions"
        )
</template>

<script>
import { createObjectPropConfig } from '@/modules/propConfigs';

export default {
    props: {
        image: createObjectPropConfig(),
    },
    data() {
        return {
            dimensions: {
                desktop: {
                    x1Width: 275,
                    canvasWidth: '275px',
                },
            },
        };
    },
};
</script>

<style lang="scss" scoped>
    .apartment-layout-image {
        display: grid;
        grid-template: 100% / 100%;
        width: 275px;
        height: 192px;
    }

    ::v-deep .image__core {
        height: 100%;
    }
</style>
