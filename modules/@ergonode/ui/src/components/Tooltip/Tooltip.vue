/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

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
        title: {
            type: String,
            default: 'My amazing tooltip text, super long text, dupa, dupa, dupa, dupa',
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
            tooltip: null,
        };
    },
    mounted() {
        if (this.$slots.default[0].elm) {
            if (this.showOnClick) {
                this.$slots.default[0].elm.addEventListener(
                    'click',
                    this.onClick,
                    true,
                );
            } else {
                this.$slots.default[0].elm.addEventListener(
                    'mouseenter',
                    this.onMouseEnter,
                    true,
                );
            }
        }
    },
    beforeDestroy() {
        const app = document.documentElement.querySelector('.app');

        if (app.contains(this.tooltip)) {
            app.removeChild(this.tooltip);

            this.tooltip = null;
        }

        if (this.$slots.default[0].elm) {
            if (this.showOnClick) {
                this.$slots.default[0].elm.removeEventListener(
                    'click',
                    this.onClick,
                    true,
                );
            } else {
                this.$slots.default[0].elm.removeEventListener(
                    'mouseenter',
                    this.onMouseEnter,
                    true,
                );
            }
        }

        window.removeEventListener('mouseover', this.onMouseOver);
    },
    methods: {
        onClick(event) {
            if (this.tooltip) {
                if (this.tooltip.classList.contains('tooltip--visible')) {
                    this.tooltip.classList.remove('tooltip--visible');
                } else {
                    this.tooltip.classList.add('tooltip--visible');
                }
            } else {
                this.createTooltip(event);
                this.tooltip.classList.add('tooltip--visible');
            }
        },
        onMouseEnter(event) {
            if (this.tooltip) {
                this.tooltip.classList.add('tooltip--visible');
            } else {
                this.createTooltip(event);
            }

            window.addEventListener('mouseover', this.onMouseOver);
        },
        onMouseOver(event) {
            const {
                xPos,
                yPos,
            } = getFixedMousePosition(event);

            const isOutsideChildren = isMouseOutsideElement(this.$el, xPos, yPos);

            if (isOutsideChildren
                && isMouseOutsideElement(this.tooltip, xPos, yPos)) {
                this.tooltip.classList.remove('tooltip--visible');

                window.removeEventListener('mouseover', this.onMouseOver);
            } else if (!isOutsideChildren) {
                this.updatePositionWhenFluid(xPos, yPos);
            }
        },
        createTooltip(event) {
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
            case POSITION.FLUID: {
                const {
                    xPos,
                    yPos,
                } = getFixedMousePosition(event);

                positionStyle = `
                    top: ${yPos}px;
                    left: ${xPos}px;
                `;
                break;
            }
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

            app.appendChild(this.tooltip);
        },
        updatePositionWhenFluid(xPos, yPos) {
            requestAnimationFrame(() => {
                this.tooltip.style.top = `${yPos}px`;
                this.tooltip.style.left = `${xPos}px`;
            });
        },
    },
    render() {
        return this.$scopedSlots.default();
    },
};
</script>

<style lang="scss">
    .tooltip {
        position: absolute;
        z-index: $Z_INDEX_MAX;
        display: flex;
        padding: 4px;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        opacity: 0;
        color: $WHITE;
        font: $FONT_MEDIUM_12_16;

        &__body {
            position: relative;
            padding: 4px 8px;
        }

        &__arrow {
            position: absolute;
            border-width: 4px;
            border-style: solid;
        }

        &--visible {
            opacity: 1;
        }
    }
</style>
