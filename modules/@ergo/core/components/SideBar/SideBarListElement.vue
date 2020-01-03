/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li
        :class="[
            'side-bar-list-element',
            {
                'side-bar-list-element--selected': isSelected,
                'side-bar-list-element--hovered': isHovered,
            }
        ]"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <NuxtLink
            :to="{ path: route.path }"
            class="side-bar-list-element__link">
            <div class="side-bar-list-element__icon">
                <Component
                    :is="listIcon"
                    :fill-color="listIconFillColor" />
            </div>
            <FadeSideBarTextTransition>
                <span
                    v-if="isExpanded"
                    class="side-bar-list-element__title"
                    v-text="route.meta.title" />
            </FadeSideBarTextTransition>
        </NuxtLink>
    </li>
</template>

<script>
import { GREEN, WHITE } from '@Core/assets/scss/_js-variables/colors.scss';
import FadeSideBarTextTransition from '@Core/components/Transitions/FadeSideBarTextTransition';

export default {
    name: 'SideBarListElement',
    components: {
        FadeSideBarTextTransition,
    },
    props: {
        route: {
            type: Object,
            required: true,
        },
        isExpanded: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
        listIcon() {
            if (!(this.route.meta && this.route.meta.icon)) return null;

            return this.route.meta.icon;
        },
        isSelected() {
            return this.$route.name === this.route.name;
        },
        listIconFillColor() {
            return this.isSelected || this.isHovered ? WHITE : GREEN;
        },
    },
    methods: {
        onMouseEnter() {
            this.isHovered = true;
        },
        onMouseLeave() {
            this.isHovered = false;
        },
    },
};
</script>

<style lang="scss" scoped>
    .side-bar-list-element {
        $element: &;

        display: flex;
        height: 48px;
        padding: 0 24px;
        box-sizing: border-box;
        cursor: pointer;

        &--selected {
            background-color: $GREEN;

            #{$element}__title {
                color: $WHITE;
            }
        }

        &:not(&--selected):not(&--hovered) {
            #{$element}__title {
                color: $GREY_DARK;
            }
        }

        &--hovered {
            #{$element}__title {
                color: $WHITE;
            }
        }

        &__link {
            display: grid;
            grid-template-columns: 32px max-content;
            grid-column-gap: 8px;
            flex: 1;
            align-items: center;
            text-decoration: none;
        }

        &__icon {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__title {
            font: $FONT_MEDIUM_14_20;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
</style>
