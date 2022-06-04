export const useMergedStates = (stateDefault, props) => ({
    on: {
        ...stateDefault.on,
        ...props.states.on,
    },
    off: {
        ...stateDefault.off,
        ...props.states.off,
    },
});

export default { useMergedStates };
