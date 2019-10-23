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
            <IconArrowDropDown
                fill-color="#fff"
                :state="arrowIconState" />
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
import { Arrow } from '~/model/icons/Arrow';

export default {
    name: 'NavigationBarSelectButton',
    components: {
        NavigationBarButton: () => import('~/components/Navigation/NavigationBar/NavigationBarButton'),
        IconArrowDropDown: () => import('~/components/Icon/Arrows/IconArrowDropDown'),
    },
    props: {
        title: {
            type: String,
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
        arrowIconState() {
            return this.isSelected ? Arrow.UP : Arrow.DOWN;
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
                const { pageX, pageY } = event;
                const {
                    top, left, width, height,
                } = this.$refs.selectContent.getBoundingClientRect();
                const isClickedInsideSelectContent = pageX > left
                    && pageX < left + width
                    && pageY > top
                    && pageY < top + height;

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
        background-color: $WHITE;
        box-shadow:
            0 2px 2px 0 rgba(0, 0, 0, 0.14),
            0 3px 1px -2px rgba(0, 0, 0, 0.12),
            0 1px 5px 0 rgba(0, 0, 0, 0.2);
        transition: all 0.4s ease;
        color: $GRAPHITE;
        cursor: default;
    }

    .icon-wrapper {
        display: flex;
        margin-right: -8px;
    }
</style>
