<template lang="pug">
    ul(:class="'list list--filter-items'")
        li(
            v-for="\
                ({ id, caption, checked }, index)\
                    in filterOptions\
            "
        )
            filter-option(
                :id="id"
                :caption="caption"
                :checked="checked"
            )
</template>

<script>
import FilterOption from './components/FilterOption.vue';
import { createArrayPropConfig, createStringPropConfig } from '@/modules/propConfigs';

export default {
    components: {
        FilterOption,
    },
    props: {
        filterOptions:
            createArrayPropConfig(),
        caption: createStringPropConfig(),
    },
};
</script>
