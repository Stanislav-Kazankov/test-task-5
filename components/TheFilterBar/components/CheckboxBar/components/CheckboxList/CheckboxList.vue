<template lang="pug">
    ul(:class="'list list--checkboxes'")
        li(
            v-for="\
                ({ id, caption, checked, tooltip }, index)\
                    in checkboxDataArray\
            "
        )
            checkbox(
                :id="id"
                :caption="caption"
                :checked="checked"
                :tooltip="tooltip"
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
        display: flex;
        flex-direction: column;
        row-gap: 6px;
        margin-bottom: 6px;
    }
</style>
