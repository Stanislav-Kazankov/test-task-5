<template lang="pug">
    base-selector(
        labelClass="filter-option"
        type="checkbox"
        :id="id"
    )
</template>

<script>
import defineCheckboxOptions from '../../../../../mixins/defineCheckboxOptions';

export default {
    mixins: [defineCheckboxOptions],
};
</script>

<style lang="scss" scoped>
    ::v-deep {
        .selector__label {
            transition: border-color 0.3s, background-color 0.3s;
        }

        .selector__input:hover {
            + .selector__label {
                border: 1px solid $colorBrightBlue;
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
