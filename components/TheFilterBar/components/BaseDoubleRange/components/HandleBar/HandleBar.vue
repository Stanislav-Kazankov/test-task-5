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
                @mousedown.stop="onHandleMouseDown"
                @transitionend="onHandleTransitionEnd"
            )
</template>

<script>
import $ from 'jquery';
import { useLowLevel } from './composables/lowLevel';
import { capitalizeWord } from '@/modules/stringProcessing';
import { createNumberPropConfig } from '@/modules/propConfigs';

export default {
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
    setup(props, { emit }) {
        const { minBound, maxBound } = props;
        const {
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
        } = useLowLevel(minBound, maxBound, emit);

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
    },
    data() {
        return {
            // $document: null,
        };
    },
    mounted() {
        // this.$document = $(document);
        // this.setLeftHandleAutomatically(this.lesserValue);
        // this.setRightHandleAutomatically(this.greaterValue);
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
                this.setLeftHandleManually(newPosition);
            }
            if ($capturedHandle[0] === $rightHandle[0]) {
                this.setRightHandleManually(newPosition);
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
            this.setTransitionForHandle(this.$leftHandle);
            this.setLeftHandleAutomatically(lesserValue);
        },
        transitRightHandleAutomatically(greaterValue) {
            this.setTransitionForHandle(this.$rightHandle);
            this.setRightHandleAutomatically(greaterValue);
        },
        transitLeftHandleAbsolutely(clientX) {
            this.transitHandleAbsolutely(this.$leftHandle, clientX);
        },
        transitRightHandleAbsolutely(clientX) {
            this.transitHandleAbsolutely(this.$rightHandle, clientX);
        },
        transitHandleAbsolutely($handle, clientX) {
            const { $scale, flooredHandleHalf } = this;
            const newCenter = clientX - $scale.offset().left;
            const valueName = this.getСorrespondingValueName($handle);
            this.triggerUpdateByHandlePosition(valueName, newCenter);
            this.setTransitionForHandle($handle);
            this.setHandle($handle, newCenter - flooredHandleHalf);
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
            this.setHandleManually(this.$leftHandle, newHandlePosition);
        },
        setRightHandleManually(newHandlePosition) {
            this.setHandleManually(this.$rightHandle, newHandlePosition);
        },
        setHandleManually($handle, newHandlePosition) {
            const { flooredHandleHalf, getLeftHandlePosition, getRightHandlePosition } = this;
            this.setHandle($handle, newHandlePosition);
            const settedHandlePosition = this.getHandlePosition($handle);
            const handleCenter = settedHandlePosition + flooredHandleHalf;
            const valueName = this.getСorrespondingValueName($handle);
            if (getLeftHandlePosition() < getRightHandlePosition()) {
                this.triggerUpdateByHandlePosition(valueName, handleCenter);
            } else {
                this.$emit(`trigger-${valueName}-value-equate`);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'handle-bar.scss';
</style>
