<template lang="pug">
    base-selector.selector--radio(
        type="radio"
        name="search-result-view"
        v-bind="$attrs"
    )
        template(#icon)
            slot(name="icon")
</template>

<script>
import { provide } from '@nuxtjs/composition-api';
import { createStringPropConfig } from '@/modules/propConfigs';

export default {
    inheritAttrs: false,
    props: {
        view: createStringPropConfig(),
    },
    setup({ view }) {
        const outerControlState = {
            description: `Отобразить результаты поиска в виде ${view}`,
        };

        provide(
            'outerControlState',
            outerControlState,
        );
    },
};
</script>

<style lang="scss" scoped>
.selector--radio {
    ::v-deep .selector {
        &__label {
            display: grid;
            justify-content: center;
            align-content: center;
            width: 30px;
            min-height: 30px;
            background-color: $colorWhite;
        }

        &__input:not(:checked) {
            ~ .selector__label {
                box-shadow: 0 4px 10px $colorLightBlack;
            }
        }
    }
}
</style>
