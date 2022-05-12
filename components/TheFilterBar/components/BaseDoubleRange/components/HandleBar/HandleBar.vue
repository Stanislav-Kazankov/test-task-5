<template lang="pug">
    .handle-bar
        .handle-bar__scale(
            ref="scale"
            @mousedown="onScaleMouseDown"
        )
            .handle-bar__selection(
                ref="selection"
                @mousedown.prevent="onSelectionMouseDown"
            )
            .handle-bar__handle.handle-bar__handle--left(
                ref="leftHandle"
                @mousedown.prevent="onHandleMouseDown"
                @transitionend="\
                    $leftHandle.css('transition', '');\
                    $selection.css('transition', '')\
                "
            )
            .handle-bar__handle.handle-bar__handle--right(
                ref="rightHandle"
                @mousedown.prevent="onHandleMouseDown"
                @transitionend="\
                    $rightHandle.css('transition', '');\
                    $selection.css('transition', '')\
                "
            )
</template>

<script>
import _ from 'lodash';
import $ from 'jquery';
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
        this.handleWidth = this.$leftHandle.width();
        this.handleHalf = this.handleWidth / 2;
        this.leftHandleMinPosition = -this.handleHalf;
        this.rightHandleMaxPosition =
            this.scaleWidth - this.handleHalf;
        this.autoSetLeftHandle();
        this.autoSetRightHandle();
    },
    methods: {
        onHandleMouseDown($event) {
            const $handle = $($event.target);
            $handle.css('z-index', '1');
            if ($handle[0] === this.$leftHandle[0]) {
                this.$rightHandle.css('z-index', '0');
            } else {
                this.$leftHandle.css('z-index', '0');
            }
            const innerOffsetLeft =
                $event.clientX - $handle.offset().left;
            this.bindedOnMouseMove = this.onHandleMouseMove
                .bind(null, $handle, innerOffsetLeft);
            this.$document.on('mousemove', this.bindedOnMouseMove);
            this.bindedOnMouseUp = this.onMouseUp.bind(null);
            this.$document.on('mouseup', this.onMouseUp);
        },
        onHandleMouseMove($capturedHandle, innerOffsetLeft, $event) {
            const { $scale, $leftHandle, $rightHandle } = this;
            $event.preventDefault();
            const newPosition =
                $event.clientX - $scale.offset().left - innerOffsetLeft;
            if ($capturedHandle[0] === $leftHandle[0]) {
                this.manualSetLeftHandle(newPosition);
            }
            if ($capturedHandle[0] === $rightHandle[0]) {
                this.manualSetRightHandle(newPosition);
            }
        },
        onMouseUp($event) {
            $event.preventDefault();
            this.$document.off('mousemove', this.bindedOnMouseMove);
            this.$document.off('mouseup', this.onMouseUp);
        },
        onScaleMouseDown($event) {
            const { clientX } = $event;
            const { $leftHandle, $rightHandle, handleWidth } = this;
            if (clientX < $leftHandle.offset().left) {
                this.transitLeftHandleAbsolutely(clientX);
            } else if (clientX > $rightHandle.offset().left + handleWidth) {
                this.transitRightHandleAbsolutely(clientX);
            }
        },
        onSelectionMouseDown($event) {
            const { clientX } = $event;
            const { $selection } = this;
            const selectionHalf = $selection.width() / 2;
            if (clientX < $selection.offset().left + selectionHalf) {
                this.transitLeftHandleAbsolutely(clientX);
            } else {
                this.transitRightHandleAbsolutely(clientX);
            }
        },
        transitLeftHandle(lesserValue) {
            this.$leftHandle.css('transition', 'left 0.5s');
            this.$selection.css('transition', 'left 0.5s, width 0.5s');
            this.autoSetLeftHandle(lesserValue);
        },
        transitRightHandle(greaterValue) {
            this.$rightHandle.css('transition', 'left 0.5s');
            this.$selection.css('transition', 'width 0.5s');
            this.autoSetRightHandle(greaterValue);
        },
        transitLeftHandleAbsolutely(clientX) {
            const { $scale, handleHalf } = this;
            const newLeftCenter = clientX - $scale.offset().left;
            this.triggerUpdateByHandlePosition('lesser', newLeftCenter);
            this.$leftHandle.css('transition', 'left 0.5s');
            this.$selection.css('transition', 'left 0.5s, width 0.5s');
            this.setLeftHandle(newLeftCenter - handleHalf);
        },
        transitRightHandleAbsolutely(clientX) {
            const { $scale, handleHalf } = this;
            const newRightCenter = clientX - $scale.offset().left;
            this.triggerUpdateByHandlePosition('greater', newRightCenter);
            this.$rightHandle.css('transition', 'left 0.5s');
            this.$selection.css('transition', 'width 0.5s');
            this.setRightHandle(newRightCenter - handleHalf);
        },
        bindedOnMouseMove: () => {},
        autoSetLeftHandle(lesserValue = this.lesserValue) {
            const { maxBound, scaleWidth, handleHalf } = this;
            this.setLeftHandle(
                lesserValue / maxBound * scaleWidth - handleHalf,
            );
        },
        autoSetRightHandle(greaterValue = this.greaterValue) {
            const { maxBound, scaleWidth, handleHalf } = this;
            this.setRightHandle(
                greaterValue / maxBound * scaleWidth - handleHalf,
            );
        },
        manualSetLeftHandle(newHandlePosition) {
            this.setLeftHandle(newHandlePosition);
            const { $leftHandle, handleHalf } = this;
            const leftCenter =
                $leftHandle.position().left + handleHalf + 1;
            this.triggerUpdateByHandlePosition('lesser', leftCenter);
        },
        manualSetRightHandle(newHandlePosition) {
            this.setRightHandle(newHandlePosition);
            const { $rightHandle, handleHalf } = this;
            const rightCenter =
                $rightHandle.position().left + handleHalf + 1;
            this.triggerUpdateByHandlePosition('greater', rightCenter);
        },
        setLeftHandle(newHandlePosition) {
            const { handleHalf, leftHandleMinPosition } = this;
            const rightHandlePosition = this.$rightHandle.position().left;
            const validHandlePosition = _.clamp(
                newHandlePosition,
                leftHandleMinPosition,
                rightHandlePosition + 1,
            );
            this.$leftHandle
                .css('left', validHandlePosition - 1 + 'px');
            $(this.$refs.selection)
                .css('left', validHandlePosition + handleHalf + 'px');
            const newSelectionWidth = rightHandlePosition - validHandlePosition;
            $(this.$refs.selection)
                .css('width', newSelectionWidth + 1 + 'px');
        },
        setRightHandle(newHandlePosition) {
            const { rightHandleMaxPosition } = this;
            const leftHandlePosition = this.$leftHandle.position().left;
            const validHandlePosition = _.clamp(
                newHandlePosition,
                leftHandlePosition + 1,
                rightHandleMaxPosition,
            );
            this.$rightHandle
                .css('left', validHandlePosition - 1 + 'px');
            const newSelectionWidth = validHandlePosition - leftHandlePosition;
            $(this.$refs.selection)
                .css('width', newSelectionWidth + 'px');
        },
        triggerUpdateByHandlePosition(valueName, handleCenter) {
            const { scaleWidth, maxBound } = this;
            this.$emit(
                `trigger-${valueName}-value-update`,
                this.parse((handleCenter + 1) / scaleWidth * maxBound),
            );
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'handle-bar.scss';
</style>
