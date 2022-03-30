<template lang="pug">
    p.selector
        label.selector__label
            input.selector__input.visually-hidden(
                ref="input"
                v-bind="$attrs"
                @click="$parent.$emit(\
                    'valuechanged', $refs.input.value)\
                "
            )
            slot(name="icon")
            base-control
</template>

<script>
export default {
    inheritAttrs: false,
};
</script>
