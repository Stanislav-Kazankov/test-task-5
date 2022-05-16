import { provide } from '@nuxtjs/composition-api';
import BaseRangeField from './BaseRangeField.vue';
import { createNumberPropConfig, falsePropConfig } from '@/modules/propConfigs';

export default
(description, caption) => ({
    components: {
        BaseRangeField,
    },
    props: {
        minValue: createNumberPropConfig(),
        maxValue: createNumberPropConfig(
            Number.POSITIVE_INFINITY,
        ),
        value: createNumberPropConfig(),
        isValueChangeBlocked: falsePropConfig,
    },
    setup() {
        const outerControlState = {
            description,
            caption,
        };
        provide(
            'outerControlState',
            outerControlState,
        );
    },
});
