import { provide } from '@nuxtjs/composition-api';
import { createNumberPropConfig } from '@/modules/propConfigs';

export default
(description, caption) => ({
    props: {
        minNumberValue:
            createNumberPropConfig(),
        maxNumberValue:
            createNumberPropConfig(
                Number.MAX_VALUE,
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
