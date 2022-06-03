<template lang="pug">
    .handle-bar
        .handle-bar__scale(
            ref="scale"
            @mousedown="onScaleMouseDown"
        )
            .handle-bar__selection(
                ref="selection"
                @mousedown="onSelectionMouseDown"
            )
            .handle-bar__handle.handle-bar__handle--left(
                ref="leftHandle"
                @mousedown="onHandleMouseDown"
                @transitionend="onHandleTransitionEnd"
            )
            .handle-bar__handle.handle-bar__handle--right(
                ref="rightHandle"
                @mousedown="onHandleMouseDown"
                @transitionend="onHandleTransitionEnd"
            )
</template>

<script>
import _ from 'lodash';
import $ from 'jquery';
import { capitalizeWord } from '@/modules/stringProcessing';
import { createNumberPropConfig } from '@/modules/propConfigs';

export default {
    inject: {
        parse: {
            default: () =>
                calculatedRealFieldValue =>
                    parseInt(calculatedRealFieldValue, 10),
        },
    },
    props: {
        minBound:
            createNumberPropConfig(
                Number.NEGATIVE_INFINITY,
            ),
        maxBound:
            createNumberPropConfig(
                Number.POSITIVE_INFINITY,
            ),
        lesserValue:
            createNumberPropConfig(
                Number.NEGATIVE_INFINITY,
            ),
        greaterValue:
            createNumberPropConfig(
                Number.POSITIVE_INFINITY,
            ),
    },
    data() {
        return {
            $leftHandle: null,
            $rightHandle: null,
            $scale: null,
            $selection: null,
            mathScaleLength: null,
            handleWidth: null,
            handleHalf: null,
            leftHandleMinPosition: null,
            rightHandleMaxPosition: null,
        };
    },
    mounted() {
        this.$document = $(document);
        this.$scale = $(this.$refs.scale);
        this.$selection = $(this.$refs.selection);
        this.mathScaleLength = this.$scale.width() - 1;
        const { maxBound, minBound, mathScaleLength } = this;
        this.scaleStep = (maxBound - minBound) / mathScaleLength;
        this.$leftHandle = $(this.$refs.leftHandle);
        this.$rightHandle = $(this.$refs.rightHandle);
        this.handleWidth = this.$leftHandle.outerWidth();
        const { handleWidth } = this;
        this.flooredHandleHalf = Math.floor(handleWidth / 2);
        this.intHandleWidthOdd = Math.ceil(handleWidth % 2);
        this.leftHandleMinPosition = -this.flooredHandleHalf;
        this.rightHandleMaxPosition =
            this.mathScaleLength - this.flooredHandleHalf;
        this.setLeftHandleAutomatically(this.lesserValue);
        this.setRightHandleAutomatically(this.greaterValue);
    },
    methods: {
        onHandleMouseDown($event) {
            this.$emit('trigger-value-change-block');
            const $handle = $($event.target);
            if ($handle[0] === this.$leftHandle[0]) {
                this.setLeftHandleToFront();
            } else {
                this.setRightHandleToFront();
            }
            const innerOffsetLeft = $event.clientX - $handle.offset().left;
            this.bindedOnMouseMove = this.onHandleMouseMove
                .bind(null, $handle, innerOffsetLeft);
            this.$document.on('mousemove', this.bindedOnMouseMove);
            this.bindedOnMouseUp = this.onMouseUp.bind(null);
            this.$document.on('mouseup', this.onMouseUp);
        },
        onHandleMouseMove($capturedHandle, innerOffsetLeft, $event) {
            $event.preventDefault();
            const { $scale, $leftHandle, $rightHandle } = this;
            const newPosition =
                $event.clientX - $scale.offset().left - innerOffsetLeft;
            if ($capturedHandle[0] === $leftHandle[0]) {
                if (newPosition >= $rightHandle.position().left) {
                    this.setLeftHandle(newPosition);
                    this.$emit('trigger-lesser-value-equate');
                } else {
                    this.setLeftHandleManually(newPosition);
                }
            }
            if ($capturedHandle[0] === $rightHandle[0]) {
                if (newPosition <= $leftHandle.position().left) {
                    this.setRightHandle(newPosition);
                    this.$emit('trigger-greater-value-equate');
                } else {
                    this.setRightHandleManually(newPosition);
                }
            }
        },
        onMouseUp($event) {
            $event.preventDefault();
            this.$emit('trigger-value-change-unblock');
            this.$document.off('mousemove', this.bindedOnMouseMove);
            this.$document.off('mouseup', this.onMouseUp);
        },
        onHandleTransitionEnd($event) {
            this.$emit('trigger-value-change-unblock');
            this.unsetTransitionForHandle($($event.target));
        },
        onScaleMouseDown($event) {
            this.$emit('trigger-value-change-block');
            if (this.isSelectionNotTransitional()) {
                const { clientX } = $event;
                const { $leftHandle, $rightHandle, handleWidth, flooredHandleHalf } = this;
                if (clientX < $leftHandle.offset().left) {
                    this.transitLeftHandleAbsolutely(clientX);
                } else if (clientX > $rightHandle.offset().left + handleWidth - 1) {
                    this.transitRightHandleAbsolutely(clientX);
                    this.triggerUpdateByHandlePosition(
                        'lesser',
                        this.getLeftHandlePosition() + flooredHandleHalf,
                    );
                }
            }
        },
        onSelectionMouseDown($event) {
            this.$emit('trigger-value-change-block');
            if (this.isSelectionNotTransitional()) {
                const { clientX } = $event;
                const { $selection } = this;
                const selectionHalf = $selection.width() / 2;
                if (clientX < $selection.offset().left + selectionHalf) {
                    this.transitLeftHandleAbsolutely(clientX);
                } else {
                    this.transitRightHandleAbsolutely(clientX);
                }
            }
        },
        transitLeftHandleAutomatically(lesserValue) {
            this.setTransitionForHandle('left');
            this.setLeftHandleAutomatically(lesserValue);
        },
        transitRightHandleAutomatically(greaterValue) {
            this.setTransitionForHandle('right');
            this.setRightHandleAutomatically(greaterValue);
        },
        transitLeftHandleAbsolutely(clientX) {
            this.transitHandleAbsolutely('left', clientX);
        },
        transitRightHandleAbsolutely(clientX) {
            this.transitHandleAbsolutely('right', clientX);
        },
        transitHandleAbsolutely(handleLocation, clientX) {
            const { $scale, flooredHandleHalf } = this;
            const newCenter = clientX - $scale.offset().left;
            const valueName = this.getСorrespondingValueName(handleLocation);
            this.triggerUpdateByHandlePosition(valueName, newCenter);
            this.setTransitionForHandle(handleLocation);
            const capitalizedHandleLocation = capitalizeWord(handleLocation);
            this[`set${capitalizedHandleLocation}Handle`](
                newCenter - flooredHandleHalf,
            );
        },
        bindedOnMouseMove: () => {},
        setLeftHandleAutomatically(lesserValue) {
            this.setHandleAutomatically('left', lesserValue);
        },
        setRightHandleAutomatically(greaterValue) {
            this.setHandleAutomatically('right', greaterValue);
        },
        setHandleAutomatically(handleLocation, value) {
            const capitalizedHandleLocation = capitalizeWord(handleLocation);
            this[`set${capitalizedHandleLocation}HandleToFront`]();
            const { minBound, scaleStep, flooredHandleHalf } = this;
            this[`set${capitalizedHandleLocation}Handle`](
                (value - minBound) / scaleStep - flooredHandleHalf,
            );
        },
        setLeftHandleManually(newHandlePosition) {
            this.setHandleManually('left', newHandlePosition);
        },
        setRightHandleManually(newHandlePosition) {
            this.setHandleManually('right', newHandlePosition);
        },
        setHandleManually(handleLocation, newHandlePosition) {
            const { flooredHandleHalf } = this;
            const capitalizedHandleLocation = capitalizeWord(handleLocation);
            this[`set${capitalizedHandleLocation}Handle`](
                newHandlePosition,
            );
            const settedHandlePosition = this.getHandlePosition(handleLocation);
            const handleCenter = settedHandlePosition + flooredHandleHalf;
            const valueName = this.getСorrespondingValueName(handleLocation);
            this.triggerUpdateByHandlePosition(valueName, handleCenter);
        },
        setLeftHandleToFront() {
            this.$leftHandle.css('z-index', 1);
        },
        setRightHandleToFront() {
            this.$leftHandle.css('z-index', 0);
        },
        setLeftHandle(newHandlePosition) {
            const { leftHandleMinPosition, flooredHandleHalf } = this;
            const rightHandlePosition = this.getRightHandlePosition();
            const validHandlePosition = _.clamp(
                newHandlePosition,
                leftHandleMinPosition,
                rightHandlePosition,
            );
            this.$leftHandle.css('left', validHandlePosition + 'px');
            this.$selection.css(
                'left', validHandlePosition + flooredHandleHalf + 'px',
            );
            this.setSelectionWidth(validHandlePosition, rightHandlePosition);
        },
        setRightHandle(newHandlePosition) {
            const { rightHandleMaxPosition } = this;
            const leftHandlePosition = this.getLeftHandlePosition();
            const validHandlePosition = _.clamp(
                newHandlePosition,
                leftHandlePosition,
                rightHandleMaxPosition,
            );
            this.$rightHandle.css('left', validHandlePosition + 'px');
            this.setSelectionWidth(leftHandlePosition, validHandlePosition);
        },
        getСorrespondingValueName(handleLocation) {
            return handleLocation === 'left' ? 'lesser' : 'greater';
        },
        triggerUpdateByHandlePosition(valueName, handleCenter) {
            const { scaleStep, minBound } = this;
            this.$emit(
                `trigger-${valueName}-value-update`,
                this.parse(scaleStep * handleCenter + minBound),
            );
        },
        getLeftHandlePosition() {
            return this.getHandlePosition('left');
        },
        getRightHandlePosition() {
            return this.getHandlePosition('right');
        },
        isSelectionNotTransitional() {
            return this.$selection.css('transition-duration') === '0s';
        },
        setTransitionForHandle(handleLocation) {
            this[`$${handleLocation}Handle`].css('transition', 'left 0.33s');
            const variativePart =
                handleLocation === 'left' ? 'left 0.33s, ' : '';
            this.$selection.css(
                'transition', `${variativePart}width 0.33s`,
            );
        },
        unsetTransitionForHandle($handle) {
            $handle.css('transition', '');
            this.$selection.css('transition', '');
        },
        setSelectionWidth(leftHandlePosition, rightHandlePosition) {
            const { intHandleWidthOdd } = this;
            const newSelectionWidth =
                rightHandlePosition - leftHandlePosition + intHandleWidthOdd;
            this.$selection.css('width', newSelectionWidth + 'px');
        },
        getHandlePosition(handleLocation) {
            return this[`$${handleLocation}Handle`].position().left;
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'handle-bar.scss';
</style>
