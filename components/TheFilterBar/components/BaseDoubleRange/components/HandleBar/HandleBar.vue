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
                @mousedown.prevent="onHandleMouseDown"
            )
            .handle-bar__handle.handle-bar__handle--right(
                ref="rightHandle"
                @mousedown.prevent="onHandleMouseDown"
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
    watch: {
        lesserValue() {
            if (this.$leftHandle) {
                this.autoSetLeftHandle();
            }
        },
        greaterValue() {
            if (this.$rightHandle) {
                this.autoSetRightHandle();
            }
        },
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
            this.bindedOnMouseUp = this.onMouseUp.bind(this);
            this.$document.on('mouseup', this.bindedOnMouseUp);
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
            this.$document.off('mouseup', this.bindedOnMouseUp);
        },
        onScaleMouseDown($event) {
            const { clientX } = $event;
            const { $leftHandle, $rightHandle, handleWidth } = this;
            if (clientX < $leftHandle.offset().left) {
                this.setHandleToClientX('Left', clientX);
            } else if (clientX > $rightHandle.offset().left + handleWidth) {
                this.setHandleToClientX('Right', clientX);
            }
        },
        onSelectionMouseDown($event) {
            const { clientX } = $event;
            const { $selection } = this;
            const selectionHalf = $selection.width() / 2;
            if (clientX <= $selection.offset().left + selectionHalf) {
                this.setHandleToClientX('Left', clientX);
            } else {
                this.setHandleToClientX('Right', clientX);
            }
        },
        setHandleToClientX(handleLocation, clientX) {
            const { $scale, handleHalf } = this;
            this[`manualSet${handleLocation}Handle`](
                clientX - $scale.offset().left - handleHalf,
            );
        },
        autoSetLeftHandle() {
            const { lesserValue, maxBound, scaleWidth, handleHalf } = this;
            this.setLeftHandle(
                lesserValue / maxBound * scaleWidth - handleHalf,
            );
        },
        autoSetRightHandle() {
            const { greaterValue, maxBound, scaleWidth, handleHalf } = this;
            this.setRightHandle(
                greaterValue / maxBound * scaleWidth - handleHalf,
            );
        },
        bindedOnMouseUp: () => {},
        bindedOnMouseMove: () => {},
        manualSetLeftHandle(newHandlePosition) {
            this.setLeftHandle(newHandlePosition);
            const { $leftHandle, scaleWidth, handleHalf, maxBound } = this;
            const leftCenterPosition =
                $leftHandle.position().left + handleHalf + 1;
            this.$emit(
                'trigger-lesser-value-update',
                this.parse(leftCenterPosition / scaleWidth * maxBound),
            );
        },
        manualSetRightHandle(newHandlePosition) {
            this.setRightHandle(newHandlePosition);
            const { $rightHandle, scaleWidth, handleHalf, maxBound } = this;
            const rightCenterPosition =
                $rightHandle.position().left + handleHalf + 1;
            this.$emit(
                'trigger-greater-value-update',
                this.parse(rightCenterPosition / scaleWidth * maxBound),
            );
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
    },
};
</script>

<style lang="scss" scoped>
@import 'handle-bar.scss';
</style>
