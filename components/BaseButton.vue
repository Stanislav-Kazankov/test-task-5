<template lang="pug">
    component(
        :class="'button'"
        :is="rootElement"
    )
        button.button__core(
            v-bind="$attrs"
            type="button"
        )
            slot(name="icon")
            base-control
</template>

<script>
import { createStringPropConfig } from '@/modules/propConfigs';

export default {
    inheritAttrs: false,
    props: {
        rootElement:
            createStringPropConfig('p'),
    },
};
</script>
