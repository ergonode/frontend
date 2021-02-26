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
    isMouseOutsideElement,
} from '@UI/models/mouse';

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
    watch: {
        isFocused() {
            if (this.isFocused) {
                window.addEventListener('click', this.onClickOutside);
            } else {
                window.removeEventListener('click', this.onClickOutside);
            }
            this.$emit('focus', this.isFocused);
        },
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
        onClickOutside({
            pageX, pageY,
        }) {
            const {
                menu,
            } = this.$refs;

            this.isFocused = !isMouseOutsideElement(menu, pageX, pageY);
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
        color: $GRAPHITE;
    }
</style>
