<template lang="pug">
    base-button(:class="'button--toggle'")
        template(#icon)
            slot(name="icon")
</template>

<script>
import useSwitchFlag from './composables/useSwitchFlag';
import useMergedStates from './composables/useMergedStates';
import useOuterControlState from './composables/useOuterControlState';
import { createObjectPropConfig } from '@/modules/propConfigs';

const stateDefault = {
    on: {
        action: 'Выключить',
        caption: '',
    },
    off: {
        action: 'Включить',
        caption: '',
    },
};

export default {
    props: {
        states:
            createObjectPropConfig(
                () => stateDefault,
            ),
    },
    setup(props) {
        const isOn = useSwitchFlag();
        const mergedStates = useMergedStates(stateDefault, props);
        const { on: onState, off: offState } = mergedStates;
        useOuterControlState(isOn, onState, offState);

        return {
            isOn,
            mergedStates,
        };
    },
};
</script>
