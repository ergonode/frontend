/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li
        :class="classes"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <NuxtLink
            :to="{ name: route.name }"
            aria-label="Navigation side bar element"
            class="navigation-side-bar-element__link">
            <div class="navigation-side-bar-element__icon">
                <Component
                    :is="listIcon"
                    :fill-color="listIconFillColor" />
            </div>
            <FadeNavigationSideBarTextTransition>
                <TranslatableTitleProvider :title="route.meta.title">
                    <template #default="{ translatableTitle }">
                        <span
                            v-if="isExpanded"
                            class="navigation-side-bar-element__title"
                            v-text="translatableTitle" />
                    </template>
                </TranslatableTitleProvider>
            </FadeNavigationSideBarTextTransition>
        </NuxtLink>
    </li>
</template>

<script>
import TranslatableTitleProvider from '@Core/components/Translation/TranslatableTitleProvider';
import {
    GREEN,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'NavigationSideBarElement',
    components: {
        TranslatableTitleProvider,
    },
    props: {
        /**
         * Route data model
         */
        route: {
            type: Object,
            required: true,
        },
        /**
         * Determines state of expanded component
         */
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
        classes() {
            return [
                'navigation-side-bar-element',
                {
                    'navigation-side-bar-element--selected': this.isSelected,
                    'navigation-side-bar-element--hovered': this.isHovered,
                },
            ];
        },
        listIcon() {
            if (!(this.route.meta && this.route.meta.icon)) return null;

            return this.route.meta.icon;
        },
        isSelected() {
            return this.$route.name === this.route.name || (
                this.route.children && this.route.children.some(({
                    name,
                }) => name === this.$route.name)
            );
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
    .navigation-side-bar-element {
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
            outline: none;
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
