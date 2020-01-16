/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NavigationBarButton
        :is-selected="isFocused"
        @click.native="onClick">
        <slot name="input" />
        <FadeTransition>
            <div
                v-if="isFocused"
                ref="menu"
                class="select-content">
                <slot name="selectContent" />
            </div>
        </FadeTransition>
    </NavigationBarButton>
</template>

<script>
import {
    isMouseOutOfBoundsElement,
    getPositionForBrowser,
} from '~/model/drag_and_drop/helpers';

export default {
    name: 'NavigationBarSelectButton',
    components: {
        NavigationBarButton: () => import('~/core/components/NavigationBar/NavigationBarButton'),
        FadeTransition: () => import('~/core/components/Transitions/FadeTransition'),
    },
    data() {
        return {
            isFocused: false,
            isClickedOutside: false,
        };
    },
    destroyed() {
        window.removeEventListener('click', this.onClickOutside);
    },
    methods: {
        onClick() {
            if (!this.isFocused) {
                window.addEventListener('click', this.onClickOutside);
            }
        },
        onClickOutside(event) {
            let isClickedInsideMenu = false;

            if (this.isFocused) {
                const { xPos, yPos } = getPositionForBrowser(event);
                const { menu } = this.$refs;

                isClickedInsideMenu = !isMouseOutOfBoundsElement(menu, xPos, yPos);
                if (!isClickedInsideMenu) {
                    this.isFocused = false;
                }
            } else {
                this.isFocused = !this.isFocused;
            }

            if (!this.isFocused) {
                window.removeEventListener('click', this.onClickOutside);
            }

            this.$emit('focus', { focus: this.isFocused, isClickedInsideMenu });
        },
    },
};
</script>

<style lang="scss" scoped>
    .select-content {
        position: absolute;
        top: 48px;
        right: 0;
        z-index: $Z_INDEX_NAV;
        display: flex;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;
        transition: all 0.4s ease;
        color: $GRAPHITE;
        cursor: default;
    }
</style>
