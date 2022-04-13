<template lang="pug">
    .checkbox-bar
        checkbox-list(
            :class="{\
                'is-not-distanced':\
                    checkboxCount <= COLLAPSED_BAR_CHECKBOX_COUNT\
            }"
            :checkboxDataArray="topCheckboxDataArray"
        )
        sliding
            checkbox-list.checkbox-bar__checkbox-list(
                :checkboxDataArray="bottomCheckboxDataArray"
            )
        list-expanding-toggle.checkbox-bar__list-expanding-toggle(
            v-if="checkboxCount > COLLAPSED_BAR_CHECKBOX_COUNT"
            @click.native="\
                isCheckboxBarCollapsed =\
                !isCheckboxBarCollapsed\
            "
        )
</template>

<script>
import { ref, provide } from '@nuxtjs/composition-api';
import CheckboxList from './components/CheckboxList/CheckboxList.vue';
import Sliding from './components/Sliding.vue';
import ListExpandingToggle from './components/ListExpandingToggle.vue';
import { createArrayPropConfig } from '@/modules/propConfigs';

export default {
    components: {
        CheckboxList,
        Sliding,
        ListExpandingToggle,
    },
    props: {
        checkboxDataArray:
            createArrayPropConfig(),
    },
    setup() {
        const isCheckboxBarCollapsed = ref(true);
        const outerSlidingState = {
            isHidden: isCheckboxBarCollapsed,
        };
        provide(
            'outerSlidingState',
            outerSlidingState,
        );
        return {
            isCheckboxBarCollapsed,
        };
    },
    data() {
        return {
            COLLAPSED_BAR_CHECKBOX_COUNT: 6,
        };
    },
    computed: {
        checkboxCount() {
            return this.checkboxDataArray.length;
        },
        topCheckboxDataArray() {
            return this.checkboxDataArray.slice(
                0, this.COLLAPSED_BAR_CHECKBOX_COUNT,
            );
        },
        bottomCheckboxDataArray() {
            return this.checkboxDataArray.slice(
                this.COLLAPSED_BAR_CHECKBOX_COUNT,
                this.checkboxDataArray.length,
            );
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'checkbox-bar.scss';
</style>
