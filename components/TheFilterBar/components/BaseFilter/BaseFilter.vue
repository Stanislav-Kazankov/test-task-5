<template lang="pug">
    article.filter
        .filter__top
            h3.filter__heading
                span.visually-hidden
                    | Фильтр по {{dativeCaseFilterHeading}}
                span(aria-hidden="true")
                    | {{filterHeading}}
            selection-button.filter__selection-button(
                :selection-object="selectionObject"
                :selection-space="selectionSpace"
                :disabled="!isSelectionButtonEnabled"
            )
        slot(name="filterOptionBar")
</template>

<script>
import SelectionButton from './components/SelectionButton.vue';
import { createStringPropConfig, falsePropConfig } from '@/modules/propConfigs';

export default {
    components: {
        SelectionButton,
    },
    props: {
        filterHeading: createStringPropConfig(),
        dativeCaseFilterHeading:
            createStringPropConfig(),
        selectionObject:
            createStringPropConfig(),
        selectionSpace:
            createStringPropConfig(),
        isSelectionButtonEnabled:
            falsePropConfig,
    },
};
</script>

<style lang="scss" scoped>
    .filter {
        display: flex;
        flex-direction: column;

        &__top {
            display: flex;
            flex-wrap: wrap;
            column-gap: 8px;
            margin-bottom: 7px;
        }

        &__heading {
            font-size: 16px;
            line-height: 20px;
            font-weight: 600;
        }

        &__selection-button {
            margin-top: 3px;
        }
    }
</style>
