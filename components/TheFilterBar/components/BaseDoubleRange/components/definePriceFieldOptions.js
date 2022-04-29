import { provide } from '@nuxtjs/composition-api';
import BaseRangeField from './BaseRangeField.vue';
import { createNumberPropConfig, createStringPropConfig } from '@/modules/propConfigs';

export default
(description, caption) => ({
    components: {
        BaseRangeField,
    },
    props: {
        minNumberValue:
            createNumberPropConfig(),
        maxNumberValue:
            createNumberPropConfig(
                Number.POSITIVE_INFINITY,
            ),
        value:
            createStringPropConfig(),
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
