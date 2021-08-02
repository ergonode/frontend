/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <div class="tooltip-wrapper">
        <slot />
    </div>
</template>

<script>

import {
    POSITION,
} from '@Core/defaults/theme';
import {
    GRAPHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import {
    getFixedMousePosition,
    isMouseOutsideElement,
} from '@UI/models/mouse';

export default {
    name: 'Tooltip',
    props: {
        /**
         * Title
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * Color of tooltip
         */
        color: {
            type: String,
            default: GRAPHITE,
            validator: value => /^#([A-Fa-f0-9]{6})$/.test(value),
        },
        /**
         * The position at which tooltip will be bound to
         */
        position: {
            type: String,
            default: POSITION.FLUID,
            validator: value => Object.values(POSITION).indexOf(value) !== -1,
        },
        /**
         * Show tooltip on click
         */
        showOnClick: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the tooltip has "arrow"
         */
        cloudy: {
            type: Boolean,
            default: false,
        },
        /**
         * Max with of the tooltip
         */
        maxWidth: {
            type: String,
            default: '100px',
        },
    },
    data() {
        return {
            isMouseEnter: false,
            tooltip: null,
        };
    },
    watch: {
        title(curr, prev) {
            if (prev !== '' && curr === '') {
                this.destroyTooltip();
            } else {
                this.initTooltip();
            }
        },
    },
    mounted() {
        this.initTooltip();
    },
    beforeDestroy() {
        this.destroyTooltip();
    },
    methods: {
        onClick() {
            if (this.tooltip) {
                if (this.tooltip.classList.contains('tooltip--visible')) {
                    this.tooltip.classList.remove('tooltip--visible');
                } else {
                    this.tooltip.classList.add('tooltip--visible');
                }
            } else {
                this.createTooltip();
                this.tooltip.classList.add('tooltip--visible');
            }
        },
        onMouseEnter() {
            if (!this.isMouseEnter) {
                if (this.tooltip) {
                    this.tooltip.classList.add('tooltip--visible');
                } else {
                    this.createTooltip();
                    this.tooltip.classList.add('tooltip--visible');
                }

                document.documentElement.addEventListener('mousemove', this.onMouseMove);
            }

            this.isMouseEnter = true;
        },
        onMouseMove(event) {
            const {
                xPos,
                yPos,
            } = getFixedMousePosition(event);

            const isOutsideChildren = isMouseOutsideElement(this.$el, xPos, yPos);
            if (isOutsideChildren
                && isMouseOutsideElement(this.tooltip, xPos, yPos)) {
                this.tooltip.classList.remove('tooltip--visible');

                document.documentElement.removeEventListener('mousemove', this.onMouseMove);

                this.isMouseEnter = false;
            } else if (!isOutsideChildren) {
                this.updateFluidTooltipPosition(xPos, yPos);
            }
        },
        initTooltip() {
            if (this.$el && this.title !== '') {
                if (this.showOnClick) {
                    this.$el.addEventListener('click', this.onClick);
                } else {
                    this.$el.addEventListener('mouseenter', this.onMouseEnter);
                }
            }
        },
        destroyTooltip() {
            const app = document.documentElement.querySelector('.app');

            if (app.contains(this.tooltip)) {
                app.removeChild(this.tooltip);

                this.tooltip = null;
            }

            this.$el.removeEventListener('click', this.onClick);
            this.$el.removeEventListener('mouseenter', this.onMouseEnter);
            document.documentElement.removeEventListener('mousemove', this.onMouseMove);
        },
        createTooltip() {
            const padding = 4;
            const paddingMultiplier = this.cloudy ? 1 : -1;
            const app = document.documentElement.querySelector('.app');
            const {
                top,
                left,
                height,
            } = this.$el.getBoundingClientRect();

            let positionStyle = '';
            let arrowStyles = '';

            switch (this.position) {
            case POSITION.TOP:
                positionStyle = `
                    transform: translateY(calc(-100% - ${this.$el.offsetHeight - (padding * paddingMultiplier)}px));
                    top: ${top + height - (padding * paddingMultiplier)}px;
                    left: ${left - padding}px;
                `;
                arrowStyles = `
                    bottom: ${-padding}px;
                    left: ${padding * 2}px;
                    border-color: ${this.color} transparent transparent transparent;
                `;
                break;
            case POSITION.BOTTOM:
                positionStyle = `
                    top: ${top + height}px;
                    left: ${left - padding}px;
                `;
                arrowStyles = `
                    top: ${-padding}px;
                    left: ${padding * 2}px;
                    border-color: transparent transparent ${this.color} transparent;
                `;
                break;
            case POSITION.LEFT:
                positionStyle = `
                    transform: translateX(calc(-100%));
                    top: ${top - padding}px;
                    left: ${left}px;
                `;
                arrowStyles = `
                    top: ${padding * 2}px;
                    right: ${-padding}px;
                    border-color: transparent transparent transparent ${this.color};
                `;
                break;
            case POSITION.RIGHT:
                positionStyle = `
                    top: ${top - padding}px;
                    left: ${left + this.$el.offsetWidth}px;
                `;
                arrowStyles = `
                    top: ${padding * 2}px;
                    left: ${-padding}px;
                    border-color: transparent ${this.color} transparent transparent;
                `;
                break;
            default: break;
            }

            this.tooltip = document.createElement('div');
            let tooltipBody = `
                <div
                    class="tooltip__body"
                    style="background-color: ${this.color}; max-width: ${this.maxWidth};">
                    ${this.title}
                </div>
            `;

            if (this.cloudy) {
                tooltipBody += `<div class="tooltip__arrow" style="${arrowStyles}" />`;
            }

            this.tooltip.innerHTML = tooltipBody;
            this.tooltip.classList.add('tooltip');
            this.tooltip.style = positionStyle;

            if (this.position === POSITION.FLUID) {
                this.updateFluidTooltipPosition(left, top);
            }

            app.appendChild(this.tooltip);
        },
        updateFluidTooltipPosition(xPos, yPos) {
            this.tooltip.style.transform = `translate(${xPos - (this.tooltip.offsetWidth / 2)}px, ${yPos - 8 - this.tooltip.offsetHeight}px)`;
        },
    },
};
</script>

<style lang="scss">
    .tooltip-wrapper {
        width: fit-content;
        height: fit-content;
    }

    .tooltip {
        position: absolute;
        z-index: $Z_INDEX_NEGATIVE;
        display: flex;
        padding: 4px;
        transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        opacity: 0;
        color: $WHITE;
        font: $FONT_MEDIUM_12_16;

        &--visible {
            z-index: $Z_INDEX_MAX;
            opacity: 1;
        }

        &__body {
            position: relative;
            padding: 4px 8px;
        }

        &__arrow {
            position: absolute;
            border-width: 4px;
            border-style: solid;
        }
    }
</style>
