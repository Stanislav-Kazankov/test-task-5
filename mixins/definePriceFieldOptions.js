import { provide } from '@nuxtjs/composition-api';
import { createNaturalPropConfig } from '@/modules/propConfigs';

export default
(description, caption) => ({
    props: {
        minPossiblePrice:
            createNaturalPropConfig(),
        maxPossiblePrice:
            createNaturalPropConfig(),
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
