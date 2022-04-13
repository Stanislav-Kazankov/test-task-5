<template lang="pug">
    .checkbox-bar
        ul(
            ref="checkboxList"
            :class="'checkbox-bar__checkbox-list list'"
            :style="{'height': ` ${checkboxListHeight}px`}"
        )
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
                    @hook:mounted="isCheckboxesMounted = true"
                )
        list-expanding-toggle.checkbox-bar__list-expanding-toggle(
            @click.native="\
                isCheckboxListExpanded =\
                !isCheckboxListExpanded\
            "
        )
</template>

<script>
import _ from 'lodash';
import $ from 'jquery';
import Checkbox from './components/Checkbox.vue';
import ListExpandingToggle from './components/ListExpandingToggle.vue';
import { createArrayPropConfig } from '@/modules/propConfigs';

export default {
    components: {
        Checkbox,
        ListExpandingToggle,
    },
    props: {
        checkboxDataArray:
            createArrayPropConfig(),
    },
    data() {
        return {
            MIN_VISIBLE_CHECKBOX_COUNT: 6,
            isCheckboxListExpanded: false,
            isCheckboxesMounted: 0,
            upperCheckboxesHeight: 0,
            allCheckboxesHeight: 0,
            checkboxListRowGap: 0,
        };
    },
    computed: {
        checkboxListHeight() {
            return this.isCheckboxListExpanded
                ? this.allCheckboxesHeight +
                    this.checkboxListRowGap *
                        (this.checkboxDataArray.length - 1)
                : this.upperCheckboxesHeight +
                    this.checkboxListRowGap *
                        (this.MIN_VISIBLE_CHECKBOX_COUNT - 1);
        },
    },
    watch: {
        isCheckboxesMounted(newValue) {
            if (newValue) {
                this.upperCheckboxesHeight = _(this.$refs.checkboxes)
                    .slice(0, this.MIN_VISIBLE_CHECKBOX_COUNT)
                    .reduce(
                        (result, checkbox) => (
                            result + $(checkbox.$el).height()
                        ), 0,
                    );
                this.allCheckboxesHeight = _(this.$refs.checkboxes)
                    .reduce(
                        (result, checkbox) => (
                            result + $(checkbox.$el).height()
                        ), 0,
                    );
                this.checkboxListRowGap = parseFloat(
                    $(this.$refs.checkboxList).css('row-gap'),
                );
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'checkbox-bar.scss';
</style>
