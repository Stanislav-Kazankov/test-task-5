import { inject } from '@nuxtjs/composition-api';

export default () => {
    const outerToggleState = inject(
        'outerToggleState',
        { isOn: false },
    );

    return outerToggleState.isOn;
};
