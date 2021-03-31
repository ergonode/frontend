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
            :to="{ path: route.path, query: route.query }"
            aria-label="Navigation side bar group element"
            class="navigation-side-bar-group-element__link">
            <div class="navigation-side-bar-group-element__dot" />
            <TranslatableTitleProvider :title="route.meta.title">
                <template #default="{ translatableTitle }">
                    <span
                        class="navigation-side-bar-group-element__title"
                        v-text="translatableTitle" />
                </template>
            </TranslatableTitleProvider>
        </NuxtLink>
    </li>
</template>

<script>

import TranslatableTitleProvider from '@Core/components/Translation/TranslatableTitleProvider';
import {
    getParentRoutePath,
} from '@Core/models/navigation/tabs';

export default {
    name: 'NavigationSideBarGroupElement',
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
                'navigation-side-bar-group-element',
                {
                    'navigation-side-bar-group-element--selected': this.isSelected,
                    'navigation-side-bar-group-element--hovered': this.isHovered,
                    'navigation-side-bar-group-element--expanded': this.isExpanded,
                },
            ];
        },
        isSelected() {
            return getParentRoutePath(this.$route) === this.route.path;
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
    .navigation-side-bar-group-element {
        $element: &;

        outline: none;
        display: flex;
        height: 48px;
        padding: 0 16px 0 24px;
        box-sizing: border-box;
        cursor: pointer;

        &--selected {
            background-color: $GREEN;

            #{$element}__title {
                color: $WHITE;
            }

            #{$element}__dot {
                background-color: $WHITE;
            }
        }

        &:not(&--selected):not(&--hovered) {
            #{$element}__dot {
                background-color: $GREEN;
            }

            #{$element}__title {
                color: $GREY_DARK;
            }
        }

        &--hovered {
            #{$element}__title {
                color: $WHITE;
            }

            #{$element}__dot {
                background-color: $WHITE;
            }
        }

        &--expanded {
            height: 40px;

            #{$element}__link {
                width: 208px;
                transform: translateX(-16px);
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

        &__dot {
            justify-self: center;
            width: 4px;
            height: 4px;
            border-radius: 2px;
        }

        &__title {
            font: $FONT_MEDIUM_14_20;
        }
    }
</style>
