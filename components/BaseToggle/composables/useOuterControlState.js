import { computed, provide } from '@nuxtjs/composition-api';

export default (isOff, onState, offState) => {
    const description = computed(
        () => {
            const action = isOff.value
                ? offState.action
                : onState.action;
            return action;
        },
    );
    const caption = computed(
        () => {
            const caption = isOff.value
                ? offState.caption
                : onState.caption;
            return caption;
        },
    );
    const outerControlState = {
        description,
        caption,
    };
    provide(
        'outerControlState',
        outerControlState,
    );
};
