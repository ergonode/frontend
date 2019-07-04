/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NavigationBarButton
        :is-selected="isSelected"
        @click.native="onClick">
        <slot name="prependIcon" />
        <span
            class="title"
            v-text="title" />
        <div class="icon-wrapper">
            <Icon
                :icon="arrowIcon"
                size="medium" />
        </div>
        <div
            v-if="isSelected"
            ref="selectContent"
            class="select-content">
            <slot name="selectContent" />
        </div>
    </NavigationBarButton>
</template>

<script>

export default {
    name: 'NavigationBarSelectButton',
    components: {
        NavigationBarButton: () => import('~/components/Navigation/NavigationBar/NavigationBarButton'),
        Icon: () => import('~/components/Icon/Icon'),
    },
    props: {
        title: {
            type: String,
            required: false,
            default: 'Unknown',
        },
    },
    data() {
        return {
            isSelected: false,
            isClickedOutside: false,
        };
    },
    destroyed() {
        window.removeEventListener('click', this.onClickOutside);
    },
    computed: {
        arrowIcon() {
            const icon = !this.isSelected ? 'navbar-arrow' : 'navbar-arrow trans-half';

            return `sprite-navbar ${icon}`;
        },
    },
    methods: {
        onClick() {
            if (!this.isSelected) {
                window.addEventListener('click', this.onClickOutside);
            }
        },
        onClickOutside(event) {
            if (this.isSelected) {
                const { clientX, clientY } = event;
                const {
                    top, left, width, height,
                } = this.$refs.selectContent.getBoundingClientRect();
                const isClickedInsideSelectContent = clientX > left
                    && clientX < left + width
                    && clientY > top
                    && clientY < top + height;

                if (!isClickedInsideSelectContent) {
                    this.isSelected = false;
                }
            } else {
                this.isSelected = !this.isSelected;
            }

            if (!this.isSelected) {
                window.removeEventListener('click', this.onClickOutside);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .select-content {
        position: absolute;
        top: $toolBarHeight;
        right: -1px;
        z-index: 1;
        display: flex;
        width: 320px;
        background-color: $white;
        box-shadow:
            0 2px 2px 0 rgba(0, 0, 0, 0.14),
            0 3px 1px -2px rgba(0, 0, 0, 0.12),
            0 1px 5px 0 rgba(0, 0, 0, 0.2);
        transition: all 0.4s ease;
        color: $graphite;
        cursor: default;
    }
</style>
