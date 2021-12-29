/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="classes"
        ref="dropdown">
        <slot />
    </div>
</template>

<script>
import {
    getFixedMousePosition,
    isMouseOutsideElement,
} from '@UI/models/mouse';

export default {
    name: 'Dropdown',
    props: {
        /**
         * Determines whether content of dropdown has fixed height and width or not
         */
        fixed: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines visibility of component
         */
        visible: {
            type: Boolean,
            default: false,
        },
        /**
         * The vue component reference to which dropdown is hooked
         */
        // eslint-disable-next-line vue/require-prop-types
        parentReference: {
            required: true,
        },
    },
    computed: {
        classes() {
            return [
                'dropdown',
            ];
        },
        parentElement() {
            return typeof this.parentReference.$el === 'undefined'
                ? this.parentReference
                : this.parentReference.$el;
        },
    },
    watch: {
        fixed() {
            requestAnimationFrame(() => {
                if (this.fixed) {
                    const parentOffset = this.parentElement.getBoundingClientRect();

                    this.$refs.dropdown.style.width = `${parentOffset.width}px`;
                } else {
                    this.$refs.dropdown.style.width = null;
                }
            });
        },
        visible: {
            immediate: true,
            handler() {
                if (!this.parentReference || !this.visible) {
                    if (!this.visible) {
                        requestAnimationFrame(() => {
                            this.$refs.dropdown.style.visibility = 'hidden';
                            this.$refs.dropdown.style.opacity = '0';
                        });

                        window.removeEventListener('click', this.onClickOutside);
                    }

                    return;
                }

                requestAnimationFrame(() => {
                    setTimeout(() => {
                        this.$refs.dropdown.style.visibility = 'initial';
                        this.$refs.dropdown.style.opacity = '1';

                        const parentOffset = this.parentElement.getBoundingClientRect();
                        const offset = 2;
                        const {
                            innerHeight,
                        } = window;
                        const maxHeight = this.$refs.dropdown.clientHeight;

                        if (this.fixed) {
                            this.$refs.dropdown.style.width = `${parentOffset.width}px`;
                        }

                        const yPos = innerHeight - parentOffset.y;

                        if (this.$el.offsetWidth + parentOffset.x > window.innerWidth) {
                            this.$refs.dropdown.style.right = 0;
                        } else {
                            this.$refs.dropdown.style.left = `${parentOffset.x}px`;
                        }

                        if (yPos - parentOffset.height < maxHeight
                            && parentOffset.y >= maxHeight) {
                            this.$refs.dropdown.style.bottom = `${yPos}px`;
                            this.$refs.dropdown.style.top = null;
                        } else if (parentOffset.y < maxHeight
                            && yPos <= maxHeight) {
                            this.$refs.dropdown.style.top = 0;
                            this.$refs.dropdown.style.bottom = null;
                        } else {
                            this.$refs.dropdown.style.top = `${parentOffset.y + parentOffset.height + offset}px`;
                            this.$refs.dropdown.style.bottom = null;
                        }

                        window.addEventListener('click', this.onClickOutside);
                    });
                });
            },
        },
    },
    mounted() {
        const app = document.documentElement.querySelector('.app');

        app.appendChild(this.$refs.dropdown);
    },
    beforeDestroy() {
        const app = document.documentElement.querySelector('.app');

        if (app.contains(this.$refs.dropdown)) {
            app.removeChild(this.$refs.dropdown);
        }
    },
    methods: {
        onClickOutside(event) {
            const {
                xPos,
                yPos,
            } = getFixedMousePosition(event);
            const isClickedOutside = isMouseOutsideElement(this.$refs.dropdown, xPos, yPos);

            this.$emit('click-outside', {
                event,
                isClickedOutside,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .dropdown {
        position: absolute;
        z-index: $Z_INDEX_DROPDOWN;
        display: flex;
        flex-direction: column;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        opacity: 0;
        visibility: hidden;
        overflow: hidden;
        will-change:
            visibility,
            opacity,
            top,
            left,
            bottom,
            right,
            height,
            width;
    }
</style>
