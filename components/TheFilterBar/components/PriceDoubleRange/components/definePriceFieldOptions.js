import { toRefs, provide } from '@nuxtjs/composition-api';
import BaseNaturalField from './BaseNaturalField.vue';
import { createNumberPropConfig } from '@/modules/propConfigs';

export default
(description, caption) => ({
    components: {
        BaseNaturalField,
    },
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
