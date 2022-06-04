<template lang="pug">
    base-button(
        :class="{\
            'button--toggle': true,\
            'is-on': isOn\
        }"
        @click.native="isOn = !isOn"
    )
        template(#icon)
            slot(name="icon")
</template>

<script>
import { ref } from '@nuxtjs/composition-api';
import { useMergedStates } from './composables/mergedStates';
import { useOuterControlState } from './composables/outerControlState';
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
        const isOn = ref(false);
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
