<template lang="pug">
    base-natural-field
</template>

<script>
import { toRefs, provide } from '@nuxtjs/composition-api';
import BaseNaturalField from './BaseNaturalField.vue';
import definePriceFieldOtions from '@/mixins/definePriceFieldOptions';
import { createNumberPropConfig } from '@/modules/propConfigs';

export default {
    components: {
        BaseNaturalField,
    },
    mixins: [
        definePriceFieldOtions(
            'Максимальная цена', 'до',
        ),
    ],
    props: {
        minValue: createNumberPropConfig(),
        maxValue:
            createNumberPropConfig(Number.MAX_VALUE),
    },
    setup(props) {
        const { minValue, maxValue } = toRefs(props);
        const outerFieldState = {
            minValue,
            maxValue,
        };
        provide(
            'outerFieldState',
            outerFieldState,
        );
    },
};
</script>
