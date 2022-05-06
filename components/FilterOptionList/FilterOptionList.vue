<template lang="pug">
    ul(:class="'list list--filter-options'")
        li(
            v-for="\
                ({ id, caption, checked, icon }, index)\
                    in filterOptionsData\
            "
        )
            filter-option(
                :id="id"
                :caption="caption"
                :checked="checked"
                :icon="icon"
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
        filterOptionsData:
            createArrayPropConfig(),
        caption: createStringPropConfig(),
    },
};
</script>
