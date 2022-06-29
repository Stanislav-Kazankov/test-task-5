import { inject, ref, onMounted, unref } from '@nuxtjs/composition-api';
import _ from 'lodash';
import $ from 'jquery';

export const useLowLevel = (minBound, maxBound, emit) => {
    const parseDefault = calculatedRealFieldValue =>
        parseInt(calculatedRealFieldValue, 10);
    const parse = inject(
        'parse',
        parseDefault,
    );

    const $document = ref(null);
    const scale = ref(null);
    const $scale = ref(null);
    let mathScaleLength = null;
    let scaleStep = null;
    const selection = ref(null);
    const $selection = ref(null);
    const leftHandle = ref(null);
    const $leftHandle = ref(null);
    const rightHandle = ref(null);
    const $rightHandle = ref(null);
    let handleWidth = ref(null);
    let flooredHandleHalf = null;
    let intHandleWidthOdd = null;
    let leftHandleMinPosition = null;
    let rightHandleMaxPosition = null;

    onMounted(() => {
        $document.value = $(document);
        $scale.value = $(scale.value);
        mathScaleLength = $scale.value.width() - 1;
        scaleStep = (maxBound - minBound) / mathScaleLength;
        $selection.value = $(selection.value);
        $leftHandle.value = $(leftHandle.value);
        $rightHandle.value = $(rightHandle.value);
        handleWidth = $leftHandle.value.outerWidth();
        flooredHandleHalf = Math.floor(handleWidth / 2);
        intHandleWidthOdd = Math.ceil(handleWidth % 2);
        leftHandleMinPosition = -flooredHandleHalf;
        rightHandleMaxPosition =
            mathScaleLength - flooredHandleHalf;
    });

    const setHandle = ($handle, newHandlePosition) => {
        if ($handle[0] === $leftHandle.value[0]) {
            setLeftHandle(newHandlePosition);
        } else {
            setRightHandle(newHandlePosition);
        }
    };

    const setLeftHandle = newHandlePosition => {
        const rightHandlePosition = getRightHandlePosition();
        const validHandlePosition = _.clamp(
            newHandlePosition,
            leftHandleMinPosition,
            rightHandlePosition,
        );
        $leftHandle.value.css('left', validHandlePosition + 'px');
        $selection.value.css(
            'left', validHandlePosition + flooredHandleHalf + 'px',
        );
        setSelectionWidth(validHandlePosition, rightHandlePosition);
    };

    const getLeftHandlePosition = () => getHandlePosition($leftHandle);

    const setLeftHandleToFront = () => $leftHandle.value.css('z-index', 1);

    const setRightHandle = newHandlePosition => {
        const leftHandlePosition = getLeftHandlePosition();
        const validHandlePosition = _.clamp(
            newHandlePosition,
            leftHandlePosition,
            rightHandleMaxPosition,
        );
        $rightHandle.value.css('left', validHandlePosition + 'px');
        setSelectionWidth(leftHandlePosition, validHandlePosition);
    };

    const getRightHandlePosition = () => getHandlePosition($rightHandle);

    const setRightHandleToFront = () => $leftHandle.value.css('z-index', 0);

    const getСorrespondingValueName = $handle =>
        $handle[0] === $leftHandle.value[0] ? 'lesser' : 'greater';

    const triggerUpdateByHandlePosition = (valueName, handleCenter) => {
        emit(
            `trigger-${valueName}-value-update`,
            parse(scaleStep * handleCenter + minBound),
        );
    };

    const isSelectionNotTransitional = () =>
        $selection.value.css('transition-duration') === '0s';

    const setTransitionForHandle = $handle => {
        $handle.css('transition', 'left 0.33s');
        const variativePart =
            $handle[0] === $leftHandle.value[0] ? 'left 0.33s, ' : '';
        $selection.value.css(
            'transition', `${variativePart}width 0.33s`,
        );
    };

    const unsetTransitionForHandle = $handle => {
        $handle.css('transition', '');
        $selection.value.css('transition', '');
    };

    const setSelectionWidth = (leftHandlePosition, rightHandlePosition) => {
        const newSelectionWidth =
            rightHandlePosition - leftHandlePosition + intHandleWidthOdd;
        $selection.value.css('width', newSelectionWidth + 'px');
    };

    const getHandlePosition = $handle => unref($handle).position().left;

    return {
        $document,
        scale,
        $scale,
        scaleStep,
        selection,
        $selection,
        leftHandle,
        $leftHandle,
        rightHandle,
        $rightHandle,
        handleWidth,
        flooredHandleHalf,
        setHandle,
        setLeftHandle,
        getLeftHandlePosition,
        setLeftHandleToFront,
        setRightHandle,
        getRightHandlePosition,
        setRightHandleToFront,
        getСorrespondingValueName,
        triggerUpdateByHandlePosition,
        isSelectionNotTransitional,
        setTransitionForHandle,
        unsetTransitionForHandle,
        getHandlePosition,
    };
};

export default { useLowLevel };
