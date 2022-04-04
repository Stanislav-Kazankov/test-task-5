<template lang="pug">
    base-view-radio.selector--bar-view(
        id="bar-view"
        view="сетки"
        v-bind="$attrs"
    )
        template(#icon)
            bar-icon
</template>

<script>
import BaseViewRadio from '../BaseViewRadio.vue';
import BarIcon from './components/BarIcon.vue';

export default {
    components: {
        BaseViewRadio,
        BarIcon,
    },
    inheritAttrs: false,
};
</script>

<style lang="scss" scoped>
.selector--bar-view {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
}

::v-deep .selector__input:checked {
    ~ .selector__label {
        .svg__path {
            stroke: $colorDark;
        }
    }
}
</style>
