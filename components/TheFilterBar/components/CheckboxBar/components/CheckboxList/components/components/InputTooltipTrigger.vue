<template lang="pug">
    p.trigger
        label.trigger__label(:for="inputId")
            base-button.button--trigger(
                :class="{'is-on': isTriggerOn}"
                @click.native="isTriggerOn = true"
            )
</template>

<script>
import $ from 'jquery';
import { provide } from '@nuxtjs/composition-api';
import { createStringPropConfig } from '@/modules/propConfigs';

export default {
    props: {
        inputId: createStringPropConfig(),
    },
    setup() {
        const outerControlState = {
            description: 'Открыть всплывающую подсказку',
            caption: '?',
        };
        provide(
            'outerControlState',
            outerControlState,
        );
    },
    data() {
        return {
            isTriggerOn: false,
        };
    },
    mounted() {
        $(this.$root.$el).on('click', $event => {
            const $inputLabels = $(`label[for='${this.inputId}'`);
            if (
                $event.target !== $inputLabels[0] &&
                !$inputLabels[0].contains($event.target) &&
                $event.target !== $inputLabels[1] &&
                !$inputLabels[1].contains($event.target)
            ) {
                this.isTriggerOn = false;
            }
        });
    },
};
</script>

<style lang="scss" scoped>
    ::v-deep .button__core {
        width: 14px;
        height: 14px;
        padding-top: 1px;
        padding-right: 4px;
        padding-left: 3px;
        font-size: 11px;
        line-height: 11px;
        font-weight: 500;
        color: $colorGray;
        border: 1px solid $colorGray;
        border-radius: 50%;
        overflow: hidden;

        &:hover {
            color: $colorWhite;
            border-color: $colorBrightBlue;
            background-color: $colorBrightBlue;
        }
    }

    .is-on {
        ::v-deep .button__core {
            color: $colorWhite;
            border-color: $colorBrightBlue;
            background-color: $colorBrightBlue;
        }
    }
</style>
