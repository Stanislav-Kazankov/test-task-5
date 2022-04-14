<template lang="pug">
    .checkbox-bar
        checkbox-list(
            :class="{\
                'is-not-distanced':\
                    checkboxCount <= COLLAPSED_BAR_CHECKBOX_COUNT\
            }"
            :checkboxesData="topCheckboxesData"
        )
        sliding
            checkbox-list.checkbox-bar__checkbox-list(
                :checkboxesData="bottomCheckboxesData"
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
        checkboxesData:
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
            return this.checkboxesData.length;
        },
        topCheckboxesData() {
            return this.checkboxesData.slice(
                0, this.COLLAPSED_BAR_CHECKBOX_COUNT,
            );
        },
        bottomCheckboxesData() {
            return this.checkboxesData.slice(
                this.COLLAPSED_BAR_CHECKBOX_COUNT,
                this.checkboxesData.length,
            );
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'checkbox-bar.scss';
</style>
