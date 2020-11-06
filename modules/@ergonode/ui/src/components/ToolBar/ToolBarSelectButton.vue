/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ToolBarButton
        :selected="isFocused"
        @click.native="onClick">
        <slot name="input" />
        <FadeTransition>
            <div
                v-if="isFocused"
                ref="menu"
                class="dropdown">
                <slot name="dropdown" />
            </div>
        </FadeTransition>
    </ToolBarButton>
</template>

<script>
import ToolBarButton from '@UI/components/ToolBar/ToolBarButton';
import FadeTransition from '@UI/components/Transitions/FadeTransition';
import {
    isMouseOutOfBoundsElement,
} from '@UI/models/dragAndDrop/helpers';

export default {
    name: 'ToolBarSelectButton',
    components: {
        ToolBarButton,
        FadeTransition,
    },
    data() {
        return {
            isFocused: false,
            isClickedOutside: false,
        };
    },
    beforeDestroy() {
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
                const {
                    pageX, pageY,
                } = event;
                const {
                    menu,
                } = this.$refs;

                isClickedInsideMenu = !isMouseOutOfBoundsElement(menu, pageX, pageY);

                if (!isClickedInsideMenu) {
                    this.isFocused = false;
                }
            } else {
                this.isFocused = !this.isFocused;
            }

            if (!this.isFocused) {
                window.removeEventListener('click', this.onClickOutside);
            }

            this.$emit('focus', this.isFocused);
        },
    },
};
</script>

<style lang="scss" scoped>
    .dropdown {
        position: absolute;
        top: 48px;
        right: 0;
        z-index: $Z_INDEX_NAV;
        display: flex;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;
        transition: all 0.4s ease;
        color: $GRAPHITE;
    }
</style>
