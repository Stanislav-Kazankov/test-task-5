<template lang="pug">
    .double-range
        lesser-value-field(
            :min-value="minBound"
            :max-value="maxLesserValue"
            :value="fieldLesserValue"
            @trigger-value-update="\
                fieldLesserValue =\
                    handleBarLesserValue = $event\
            "
        )
        greater-value-field(
            :min-value="minGreaterValue"
            :max-value="maxBound"
            :value="fieldGreaterValue"
            @trigger-value-update="\
                fieldGreaterValue =\
                    handleBarGreaterValue = $event\
            "
        )
        handle-bar(
            ref="handleBar"
            :min-bound="minBound"
            :max-bound="maxBound"
            :lesser-value="handleBarLesserValue"
            :greater-value="handleBarGreaterValue"
            @trigger-lesser-value-update="\
                fieldLesserValue = $event\
            "
            @trigger-greater-value-update="\
                fieldGreaterValue = $event\
            "
        )
</template>

<script>
import LesserValueField from './components/LesserValueField.vue';
import GreaterValueField from './components/GreaterValueField.vue';
import HandleBar from './components/HandleBar/HandleBar.vue';
import { createNumberPropConfig } from '@/modules/propConfigs';

export default {
    components: {
        LesserValueField,
        GreaterValueField,
        HandleBar,
    },
    props: {
        minBound:
            createNumberPropConfig(
                Number.NEGATIVE_INFINITY,
            ),
        maxBound:
            createNumberPropConfig(
                Number.POSITIVE_INFINITY,
            ),
        initialLesserValue:
            createNumberPropConfig(null),
        initialGreaterValue:
            createNumberPropConfig(null),
    },
    data() {
        return {
            $document: null,
            fieldLesserValue: this.minBound,
            fieldGreaterValue: this.maxBound,
            handleBarLesserValue: this.minBound,
            handleBarGreaterValue: this.maxBound,
            maxLesserValue: this.maxBound,
            minGreaterValue: this.minBound,
            handleBar: null,
        };
    },
    watch: {
        fieldLesserValue(newValue) {
            this.minGreaterValue = newValue;
        },
        fieldGreaterValue(newValue) {
            this.maxLesserValue = newValue;
        },
        handleBarLesserValue(newValue) {
            this.minGreaterValue = newValue;
        },
        handleBarGreaterValue(newValue) {
            this.maxLesserValue = newValue;
        },
    },
    created() {
        this.fieldLesserValue = this.initialLesserValue || this.minBound;
        this.fieldGreaterValue = this.initialGreaterValue || this.maxBound;
        this.handleBarLesserValue = this.initialLesserValue || this.minBound;
        this.handleBarGreaterValue = this.initialGreaterValue || this.maxBound;
    },
};
</script>

<style lang="scss" scoped>
@import 'double-range.scss';
</style>
