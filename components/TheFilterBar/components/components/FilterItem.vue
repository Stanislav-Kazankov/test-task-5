<template lang="pug">
    base-selector(
        labelClass="filter-item"
        type="checkbox"
        :id="id"
    )
</template>

<script>
import { provide } from '@nuxtjs/composition-api';
import { createStringPropConfig } from '@/modules/propConfigs';

export default {
    inheritAttrs: false,
    props: {
        id: createStringPropConfig(),
        caption: createStringPropConfig(),
    },
    setup({ caption }) {
        const outerControlState = {
            caption,
            description: `Применить фильтр "${caption}"`,
        };

        provide(
            'outerControlState',
            outerControlState,
        );
    },
};
</script>

<style lang="scss" scoped>
    ::v-deep {
        .selector__label {
            transition: border-color 0.3s, background-color 0.3s;
        }

        .selector__input:hover {
            + .selector__label {
                border: 1px solid $colorBrightBlue;
            }
        }

        .selector__input:checked {
            + .selector__label {
                border-color: $colorSuperLightBlue;
                background-color: $colorSuperLightBlue;
            }
        }
    }
</style>
