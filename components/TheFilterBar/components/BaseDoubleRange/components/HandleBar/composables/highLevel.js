import { onMounted } from '@nuxtjs/composition-api';

export const useHighLevel = (
    lesserValue, greaterValue, $leftHandle,
    $rightHandle, setHandleToFront, setHandle,
    minBound, scaleStep, flooredHandleHalf,
) => {
    onMounted(() => {
        setLeftHandleAutomatically(lesserValue);
        setRightHandleAutomatically(greaterValue);
    });

    const setLeftHandleAutomatically = lesserValue => {
        setHandleAutomatically($leftHandle, lesserValue);
    };

    const setRightHandleAutomatically = greaterValue => {
        setHandleAutomatically($rightHandle, greaterValue);
    };

    const setHandleAutomatically = ($handle, value) => {
        setHandleToFront($handle);
        setHandle(
            $handle,
            (value - minBound) / scaleStep - flooredHandleHalf,
        );
    };

    return {
        setLeftHandleAutomatically,
        setRightHandleAutomatically,
    };
};

export default { useHighLevel };
