<template lang="pug">
    base-button.button--selection(
        v-bind="$attrs"
    )
</template>

<script>
import { provide } from '@nuxtjs/composition-api';
import { createStringPropConfig } from '@/modules/propConfigs';

export default {
    inheritAttrs: false,
    props: {
        selectionObject:
            createStringPropConfig(),
        selectionSpace:
            createStringPropConfig(),
    },
    setup({ selectionObject, selectionSpace }) {
        if (selectionSpace) {
            const outerControlState = {
                caption: `Выбрать на ${selectionSpace}`,
                description:
                    `Выбрать ${selectionObject} на ${selectionSpace}`,
            };
            provide(
                'outerControlState',
                outerControlState,
            );
        }
    },
};
</script>

<style lang="scss" scoped>
    .button--selection {
        ::v-deep .button__core {
            min-height: 15px;
            font-size: 12px;
            line-height: 15px;
            color: $colorBrightBlue;

            &:disabled {
                color: $colorBlueGray;
            }
        }
    }
</style>
