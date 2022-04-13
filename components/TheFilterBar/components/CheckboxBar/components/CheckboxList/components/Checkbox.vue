<template lang="pug">
    base-selector.selector--checkbox(
        type="checkbox"
        :id="id"
    )
        template(#icon)
            span.checkbox-icon(aria-hidden="true")
</template>

<script>
import defineCheckboxOptions from '../../../../../../../mixins/defineCheckboxOptions';

export default {
    mixins: [defineCheckboxOptions],
};
</script>

<style lang="scss" scoped>
    .selector--checkbox {
        ::v-deep .selector__label {
            display: flex;
            flex-wrap: wrap;
            column-gap: 7px;
            font-size: 12px;
            line-height: 15px;
        }

        ::v-deep {
            .checkbox-icon {
                position: relative;
                display: grid;
                width: 14px;
                height: 14px;
                border: 1px solid $colorSuperLightGray;
                border-radius: 2px;
                transition: background-color 0.3s;

                &::before {
                    content: '';
                    position: absolute;
                    top: 4px;
                    left: 2px;
                    width: 5px;
                    height: 2px;
                    background-color: $colorDark;
                    transform: rotate(39deg) scale(0, 0) translate(12px, 3px);
                    transition: transform 0.2s;
                }

                &::after {
                    content: '';
                    position: absolute;
                    top: 3px;
                    left: 5px;
                    width: 11px;
                    height: 2px;
                    background-color: $colorDark;
                    transform: rotate(-46deg) scale(0, 0) translate(-8px, 3px);
                    transition: transform 0.2s;
                }
            }

            .selector__input:hover {
                + .selector__label {
                    color: $colorBrightBlue;

                    .checkbox-icon {
                        border-color: $colorUltraLightBlue;
                        background-color: $colorUltraLightBlue;
                    }
                }
            }

            .selector__input:checked {
                + .selector__label {
                    color: $colorBrightBlue;

                    .checkbox-icon {
                        border-color: $colorSuperLightBlue;
                        background-color: $colorSuperLightBlue;

                        &::before {
                            transform: rotate(39deg) scale(1, 1) translate(0, 0);
                        }

                        &::after {
                            transform: rotate(-46deg) scale(1, 1) translate(0, 0);
                        }
                    }
                }
            }

            .control {
                width: 271px;
            }
        }
    }
</style>
