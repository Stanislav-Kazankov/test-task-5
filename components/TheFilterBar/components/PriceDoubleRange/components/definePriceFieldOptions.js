import { toRefs, provide } from '@nuxtjs/composition-api';
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
    setup(props) {
        const { minNumberValue, maxNumberValue } = toRefs(props);
        const outerFieldState = {
            minNumberValue,
            maxNumberValue,
        };
        provide(
            'outerFieldState',
            outerFieldState,
        );
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
