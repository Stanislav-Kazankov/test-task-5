import { provide } from '@nuxtjs/composition-api';
import BaseRangeField from './BaseRangeField.vue';
import { createNumberPropConfig } from '@/modules/propConfigs';

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
