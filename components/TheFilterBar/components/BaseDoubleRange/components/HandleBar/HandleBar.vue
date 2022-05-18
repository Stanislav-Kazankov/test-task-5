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
            scaleWidth: null,
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
        this.scaleWidth = this.$scale.width();
        this.$leftHandle = $(this.$refs.leftHandle);
        this.$rightHandle = $(this.$refs.rightHandle);
        this.handleWidth = this.$leftHandle.outerWidth();
        this.handleHalf = this.handleWidth / 2;
        this.leftHandleMinPosition = -this.handleHalf;
        this.rightHandleMaxPosition =
            this.scaleWidth - this.handleHalf - 1;
        this.setLeftHandleAutomatically(this.lesserValue);
        this.setRightHandleAutomatically(this.greaterValue);
    },
    methods: {
        onHandleMouseDown($event) {
            const $handle = $($event.target);
            $handle.css('z-index', '1');
            this.$emit('trigger-value-change-block');
            if ($handle[0] === this.$leftHandle[0]) {
                this.$rightHandle.css('z-index', '0');
            } else {
                this.$leftHandle.css('z-index', '0');
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
                this.setHandleManually('left', newPosition);
            }
            if ($capturedHandle[0] === $rightHandle[0]) {
                this.setHandleManually('right', newPosition);
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
            $($event.target).css('transition', '');
            this.$selection.css('transition', '');
        },
        onScaleMouseDown($event) {
            this.$emit('trigger-value-change-block');
            if (this.$selection.css('transition-duration') === '0s') {
                const { clientX } = $event;
                const { $leftHandle, $rightHandle, handleWidth } = this;
                if (clientX < $leftHandle.offset().left) {
                    this.transitLeftHandleAbsolutely(clientX);
                } else if (clientX > $rightHandle.offset().left + handleWidth) {
                    this.transitRightHandleAbsolutely(clientX);
                    this.triggerUpdateByHandlePosition(
                        'lesser',
                        this.$leftHandle.position().left + this.handleHalf,
                    );
                }
            }
        },
        onSelectionMouseDown($event) {
            this.$emit('trigger-value-change-block');
            if (this.$selection.css('transition-duration') === '0s') {
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
        transitLeftHandle(lesserValue) {
            this.setTransitionForHandle('left');
            this.setLeftHandleAutomatically(lesserValue);
        },
        transitRightHandle(greaterValue) {
            this.setTransitionForHandle('right');
            this.setRightHandleAutomatically(greaterValue);
        },
        transitLeftHandleAbsolutely(clientX) {
            const { $scale, handleHalf } = this;
            const newLeftCenter = clientX - $scale.offset().left;
            this.triggerUpdateByHandlePosition('lesser', newLeftCenter);
            this.setTransitionForHandle('left');
            this.setLeftHandle(newLeftCenter - handleHalf);
        },
        transitRightHandleAbsolutely(clientX) {
            const { $scale, handleHalf } = this;
            const newRightCenter = clientX - $scale.offset().left;
            this.triggerUpdateByHandlePosition('greater', newRightCenter);
            this.setTransitionForHandle('right');
            this.setRightHandle(newRightCenter - handleHalf);
        },
        bindedOnMouseMove: () => {},
        setLeftHandleAutomatically(lesserValue) {
            const { maxBound, minBound, scaleWidth, handleHalf } = this;
            this.setLeftHandle(
                (lesserValue - minBound) / (maxBound - minBound) *
                    scaleWidth - handleHalf,
            );
        },
        setRightHandleAutomatically(greaterValue) {
            const { maxBound, minBound, scaleWidth, handleHalf } = this;
            this.setRightHandle(
                (greaterValue - minBound) / (maxBound - minBound) *
                    scaleWidth - handleHalf,
            );
        },
        setHandleManually(handleLocation, newHandlePosition) {
            const { handleHalf } = this;
            this[`set${capitalizeWord(handleLocation)}Handle`](
                newHandlePosition,
            );
            const handleCenter =
                this[`$${handleLocation}Handle`].position().left +
                    handleHalf;
            const valueName =
                handleLocation === 'left' ? 'lesser' : 'greater';
            this.triggerUpdateByHandlePosition(valueName, handleCenter);
        },
        setLeftHandle(newHandlePosition) {
            const { handleHalf, leftHandleMinPosition } = this;
            const rightHandlePosition = this.$rightHandle.position().left;
            const validHandlePosition = _.clamp(
                newHandlePosition,
                leftHandleMinPosition,
                rightHandlePosition,
            );
            this.$leftHandle
                .css('left', validHandlePosition + 'px');
            $(this.$refs.selection)
                .css('left', validHandlePosition + handleHalf + 'px');
            const newSelectionWidth = rightHandlePosition - validHandlePosition;
            $(this.$refs.selection)
                .css('width', newSelectionWidth + 'px');
        },
        setRightHandle(newHandlePosition) {
            const { rightHandleMaxPosition } = this;
            const leftHandlePosition = this.$leftHandle.position().left;
            const validHandlePosition = _.clamp(
                newHandlePosition,
                leftHandlePosition,
                rightHandleMaxPosition,
            );
            this.$rightHandle
                .css('left', validHandlePosition + 'px');
            const newSelectionWidth = validHandlePosition - leftHandlePosition;
            $(this.$refs.selection)
                .css('width', newSelectionWidth + 'px');
        },
        triggerUpdateByHandlePosition(valueName, handleCenter) {
            const { scaleWidth, maxBound, minBound } = this;
            this.$emit(
                `trigger-${valueName}-value-update`,
                this.parse(
                    (maxBound - minBound) / (scaleWidth - 1) *
                        handleCenter + minBound,
                ),
            );
        },
        setTransitionForHandle(handleLocation) {
            this[`$${handleLocation}Handle`].css('transition', 'left 0.33s');
            const variativePart =
                handleLocation === 'left' ? 'left 0.33s, ' : '';
            this.$selection.css(
                'transition', `${variativePart}width 0.33s`,
            );
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'handle-bar.scss';
</style>
