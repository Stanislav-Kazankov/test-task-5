import { provide } from '@nuxtjs/composition-api';
import { createStringPropConfig } from '@/modules/propConfigs';

export default {
    inheritAttrs: false,
    props: {
        id: createStringPropConfig(),
        caption: createStringPropConfig(),
    },
    setup({ caption }) {
        const outerControlState = {
            caption,
            description: `Применить фильтр "${caption}"`,
        };
        provide(
            'outerControlState',
            outerControlState,
        );
    },
};
