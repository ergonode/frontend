/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li
        :class="classes"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <div
            class="navigation-side-bar-group__activator"
            @click="onGroupSelect">
            <Component
                class="navigation-side-bar-group__icon"
                :is="listIcon"
                :fill-color="listIconFillColor" />
            <FadeNavigationSideBarTextTransition>
                <TranslatableTitleProvider :title="route.group.title">
                    <template #default="{ translatableTitle }">
                        <span
                            v-if="isExpanded"
                            class="navigation-side-bar-group__title"
                            v-text="translatableTitle" />
                    </template>
                </TranslatableTitleProvider>
            </FadeNavigationSideBarTextTransition>
            <IconArrowDropdown
                v-if="isExpanded"
                :state="dropDownState"
                :fill-color="dropdownIconFillColor" />
        </div>
        <template v-if="isExpanded">
            <AutoHeightTransition>
                <ul
                    v-if="isSelected"
                    class="navigation-side-bar-group__items">
                    <NavigationSideBarGroupElement
                        v-for="(child, index) in route.routes"
                        :key="index"
                        :is-expanded="!isExpanded && isHovered"
                        :route="getRoute(child)" />
                </ul>
            </AutoHeightTransition>
        </template>
        <ul
            v-else-if="isHovered"
            class="navigation-side-bar-group__items">
            <li class="navigation-side-bar-group__expanded-title">
                <TranslatableTitleProvider :title="route.group.title">
                    <template #default="{ translatableTitle }">
                        <span
                            class="navigation-side-bar-group__title"
                            v-text="translatableTitle" />
                    </template>
                </TranslatableTitleProvider>
            </li>
            <NavigationSideBarGroupElement
                v-for="(child, index) in route.routes"
                :key="index"
                :route="getRoute(child)"
                :is-expanded="isHovered" />
            <div class="navigation-side-bar-group__footer" />
        </ul>
    </li>
</template>

<script>
import TranslatableTitleProvider from '@Core/components/Translation/TranslatableTitleProvider';
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    GREEN,
    GREY_DARK,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import NavigationSideBarGroupElement from '@UI/components/NavigationSideBar/NavigationSideBarGroupElement';

export default {
    name: 'NavigationSideBarGroup',
    components: {
        NavigationSideBarGroupElement,
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
        childrenQueries: {
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
        /**
         * Determines if component is selected
         */
        isSelected: {
            type: Boolean,
            default: false,
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
                'navigation-side-bar-group',
                {
                    'navigation-side-bar-group--selected': this.isSelected,
                    'navigation-side-bar-group--activated': this.isGroupActivated && !this.isSelected,
                    'navigation-side-bar-group--hovered': this.isHovered,
                    'navigation-side-bar-group--expanded': !this.isExpanded && this.isHovered,
                },
            ];
        },
        listIcon() {
            return this.route.group.icon || null;
        },
        listIconFillColor() {
            return this.isSelected
            || this.isHovered || this.isGroupActivated
                ? WHITE : GREEN;
        },
        dropdownIconFillColor() {
            return this.isSelected
            || this.isHovered || this.isGroupActivated
                ? WHITE : GREY_DARK;
        },
        dropDownState() {
            return this.isSelected
                ? ARROW.UP
                : ARROW.DOWN;
        },
        isGroupActivated() {
            return this.route.routes.some(route => this.$route.name
                && this.$route.name.includes(route.name));
        },
    },
    methods: {
        getRoute(route) {
            let query = this.childrenQueries[route.name] || {};

            if (route.redirect) {
                query = this.childrenQueries[route.redirect.name];
            }

            return {
                ...route,
                query,
            };
        },
        onGroupSelect() {
            if (this.isExpanded) {
                this.$emit('select', this.isSelected ? null : this.route.group.title);
            }
        },
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
    .navigation-side-bar-group {
        $element: &;

        outline: none;
        position: relative;
        display: flex;
        flex-direction: column;
        cursor: pointer;

        &--selected, &--activated {
            #{$element}__title {
                color: $WHITE;
            }
        }

        &:not(&--selected):not(&--hovered):not(&--activated) {
            #{$element}__title {
                color: $GREY_DARK;
            }
        }

        &--hovered {
            #{$element}__title {
                color: $WHITE;
            }
        }

        &--expanded {
            background-color: $GRAPHITE_COAL;

            #{$element}__items {
                position: fixed;
                transform: translateX(80px);
            }
        }

        &__activator {
            position: relative;
            display: grid;
            grid-template-columns: 32px auto max-content;
            grid-column-gap: 8px;
            flex: 1 1 48px;
            align-items: center;
            height: 48px;
            padding: 0 16px 0 24px;
            box-sizing: border-box;
        }

        &__icon {
            justify-self: center;
        }

        &__expanded-title {
            display: flex;
            align-items: center;
            height: 48px;
            padding: 0 12px 0 16px;
            box-sizing: border-box;
        }

        &__title {
            font: $FONT_MEDIUM_14_20;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        &__items {
            background-color: $GRAPHITE_COAL;
        }

        &__footer {
            height: 8px;
        }
    }
</style>
