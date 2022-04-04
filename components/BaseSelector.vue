<template lang="pug">
    p.selector
        input.selector__input.visually-hidden(
            :id="id"
            ref="input"
            v-bind="$attrs"
        )
        label.selector__label(:for="id")
            slot(name="icon")
            base-control
</template>

<script>
import { createStringPropConfig } from '@/modules/propConfigs';
export default {
    inheritAttrs: false,
    props: {
        id: createStringPropConfig(
            'selector-input',
        ),
    },
};
</script>
