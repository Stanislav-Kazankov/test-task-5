<template lang="pug">
    article.filter
        h3.filter__heading
            span.visually-hidden
                | Фильтр по {{dativeCaseFilterHeading}}
            span(aria-hidden="true")
                | {{filterHeading}}
        slot(name="filterOptionBar")
</template>

<script>
import { createStringPropConfig } from '~/modules/propConfigs';
export default {
    props: {
        filterHeading: createStringPropConfig(),
        dativeCaseFilterHeading:
            createStringPropConfig(),
    },
};
</script>

<style lang="scss" scoped>
    .filter {
        display: flex;
        flex-direction: column;

        &__heading {
            font-size: 16px;
            line-height: 20px;
            font-weight: 600;
            margin-bottom: 7px;
        }
    }
</style>
