<template lang="pug">
    base-view-radio.selector--list-view(
        id="list-view"
        view="списка"
        v-bind="$attrs"
    )
        template(#icon)
            list-icon
</template>

<script>
import BaseViewRadio from '../BaseViewRadio.vue';
import ListIcon from './components/ListIcon.vue';

export default {
    components: {
        BaseViewRadio,
        ListIcon,
    },
    inheritAttrs: false,
};
</script>

<style lang="scss" scoped>
.selector--list-view {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}

::v-deep .selector__input:checked {
    ~ .selector__label {
        .svg__path {
            fill: $colorDark;
        }
    }
}
</style>
