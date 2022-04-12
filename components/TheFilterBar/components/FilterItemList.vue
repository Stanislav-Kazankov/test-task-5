<template lang="pug">
    ul(:class="'list list--filter-items'")
        li(
            v-for="\
                ({ id, caption, checked }, index)\
                    in filterItems\
            "
        )
            filter-item(
                :id="id"
                :caption="caption"
                :checked="checked"
            )
</template>

<script>
import FilterItem from './components/FilterItem.vue';
import { createArrayPropConfig, createStringPropConfig } from '@/modules/propConfigs';

export default {
    components: {
        FilterItem,
    },
    props: {
        filterItems:
            createArrayPropConfig(),
        caption: createStringPropConfig(),
    },
};
</script>
