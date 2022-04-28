import { provide } from '@nuxtjs/composition-api';
import BaseRangeField from './BaseRangeField.vue';
import { createNumberPropConfig } from '@/modules/propConfigs';

export default
(description, caption) => ({
    inheritAttrs: false,
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
