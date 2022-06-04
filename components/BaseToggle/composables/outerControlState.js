import { computed, provide } from '@nuxtjs/composition-api';

export const useOuterControlState = (isOn, onState, offState) => {
    const description = computed(
        () => {
            const action = isOn.value
                ? onState.action
                : offState.action;
            return action;
        },
    );
    const caption = computed(
        () => {
            const caption = isOn.value
                ? onState.caption
                : offState.caption;
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

export default { useOuterControlState };
