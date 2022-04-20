<template lang="pug">
    base-selector(
        labelClass="filter-option"
        type="checkbox"
        :id="id"
    )
        template(#icon)
            img(
                ref="icon"
                :style="{'background-color': iconBackgroundColor}"
                v-if="icon.relativeUrl"
                aria-hidden="true"
                :src="iconUrl"
                :width="icon.width"
                :height="icon.height"
                @load="\
                    iconLoaded=\
                        $refs.icon\
                            ? $refs.icon.naturalWidth > 1\
                            : false\
                "
            )
</template>

<script>
import defineCheckboxOptions from '../../../../../mixins/defineCheckboxOptions';
import { createObjectPropConfig } from '@/modules/propConfigs';

export default {
    mixins: [defineCheckboxOptions],
    props: {
        icon: createObjectPropConfig(),
    },
    data() {
        return {
            iconLoaded: false,
        };
    },
    computed: {
        iconUrl() {
            return process.env.baseURL +
                this.icon.relativeUrl;
        },
        iconBackgroundColor() {
            return !this.iconLoaded
                ? this.icon.backgroundColorBeforeLoading
                : '';
        },
    },
};
</script>

<style lang="scss" scoped>
    ::v-deep {
        .selector__label {
            transition: border-color 0.3s, background-color 0.3s;
        }

        .selector__input:hover {
            + .selector__label {
                border-color: $colorBrightBlue;
            }
        }

        .selector__input:checked {
            + .selector__label {
                border-color: $colorSuperLightBlue;
                background-color: $colorSuperLightBlue;
            }
        }
    }
</style>
