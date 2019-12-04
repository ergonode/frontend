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
            if (this.isFocused) {
                const { pageX, pageY } = event;
                const {
                    top, left, width, height,
                } = this.$refs.menu.getBoundingClientRect();
                const isClickedInsideMenu = pageX > left
                    && pageX < left + width
                    && pageY > top
                    && pageY < top + height;

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
    .select-content {
        position: absolute;
        top: $toolBarHeight;
        right: 0;
        z-index: 2;
        display: flex;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;
        transition: all 0.4s ease;
        color: $GRAPHITE;
        cursor: default;
    }
</style>
