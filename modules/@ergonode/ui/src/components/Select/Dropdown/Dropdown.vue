/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ClickOutsideGlobalEvent @click-outside="onClickOutside">
        <div
            :class="classes"
            ref="dropdown">
            <slot />
        </div>
    </ClickOutsideGlobalEvent>
</template>

<script>
import ClickOutsideGlobalEvent from '@UI/components/Events/ClickOutsideGlobalEvent';

export default {
    name: 'Dropdown',
    components: {
        ClickOutsideGlobalEvent,
    },
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
        parentReference: {
            required: true,
        },
    },
    computed: {
        classes() {
            return [
                'dropdown',
                {
                    'dropdown--visible': this.visible,
                },
            ];
        },
    },
    watch: {
        visible: {
            immediate: true,
            handler() {
                if (!this.parentReference || !this.visible) {
                    return;
                }

                const parentElement = typeof this.parentReference.$el === 'undefined'
                    ? this.parentReference
                    : this.parentReference.$el;

                requestAnimationFrame(() => {
                    const parentOffset = parentElement.getBoundingClientRect();
                    const offset = 2;
                    const {
                        innerHeight,
                    } = window;
                    let maxHeight = 200;

                    if (this.fixed) {
                        this.$refs.dropdown.style.maxHeight = `${maxHeight}px`;
                        this.$refs.dropdown.style.width = `${parentOffset.width}px`;
                    } else {
                        maxHeight = this.$refs.dropdown.clientHeight;
                    }

                    const yPos = innerHeight - parentOffset.y;

                    if (this.$el.offsetWidth + parentOffset.x > window.innerWidth) {
                        this.$refs.dropdown.style.right = 0;
                    } else {
                        this.$refs.dropdown.style.left = `${parentOffset.x}px`;
                    }

                    if (yPos < maxHeight
                        && parentOffset.y >= maxHeight) {
                        this.$refs.dropdown.style.bottom = `${yPos}px`;
                    } else if (parentOffset.y < maxHeight
                        && yPos <= maxHeight) {
                        this.$refs.dropdown.style.top = 0;
                    } else {
                        this.$refs.dropdown.style.top = `${parentOffset.y + parentOffset.height + offset}px`;
                    }
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
        onClickOutside(payload) {
            this.$emit('click-outside', payload);
        },
    },
};
</script>

<style lang="scss" scoped>
    .dropdown {
        position: absolute;
        z-index: $Z_INDEX_MAX;
        display: none;
        flex-direction: column;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;
        will-change:
            top,
            left,
            bottom,
            right,
            height,
            width;

        &--visible {
            display: flex;
        }
    }
</style>
