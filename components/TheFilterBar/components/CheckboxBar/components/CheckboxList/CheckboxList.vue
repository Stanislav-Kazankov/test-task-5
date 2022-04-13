<template lang="pug">
    ul(:class="'list list--checkboxes'")
        li(
            v-for="\
                ({ id, caption, checked }, index)\
                    in checkboxDataArray\
            "
        )
            checkbox(
                ref="checkboxes"
                :id="id"
                :caption="caption"
                :checked="checked"
            )
</template>

<script>
import Checkbox from './components/Checkbox.vue';
import { createArrayPropConfig } from '@/modules/propConfigs';

export default {
    components: {
        Checkbox,
    },
    props: {
        checkboxDataArray:
            createArrayPropConfig(),
    },
};
</script>

<style lang="scss" scoped>
    .list--checkboxes {
        display: grid;
        row-gap: 6px;
        margin-bottom: 6px;
    }
</style>
