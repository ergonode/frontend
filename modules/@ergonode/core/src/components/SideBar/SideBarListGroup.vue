/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li
        :class="[
            'side-bar-list-group',
            {
                'side-bar-list-group--selected': isSelected,
                'side-bar-list-group--activated': isGroupActivated && !isSelected,
                'side-bar-list-group--hovered': isHovered,
                'side-bar-list-group--expanded': !isExpanded && isHovered,
            }
        ]"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <div
            class="side-bar-list-group__activator"
            @click="onGroupSelect">
            <Component
                class="side-bar-list-group__icon"
                :is="listIcon"
                :fill-color="listIconFillColor" />
            <FadeSideBarTextTransition>
                <span
                    v-if="isExpanded"
                    class="side-bar-list-group__title"
                    v-text="route.group.title" />
            </FadeSideBarTextTransition>
            <IconArrowDropDown
                v-if="isExpanded"
                :state="dropDownState"
                :fill-color="dropdownIconFillColor" />
        </div>
        <template v-if="isExpanded">
            <AutoHeightTransition>
                <ul
                    v-if="isSelected"
                    class="side-bar-list-group__items">
                    <SideBarListGroupElement
                        v-for="(child, index) in route.routes"
                        :key="index"
                        :route="child" />
                </ul>
            </AutoHeightTransition>
        </template>
        <ul
            v-else-if="isHovered"
            class="side-bar-list-group__items">
            <div
                class="side-bar-list-group__expanded-title">
                <span
                    class="side-bar-list-group__title"
                    v-text="route.group.title" />
            </div>
            <SideBarListGroupElement
                v-for="(child, index) in route.routes"
                :key="index"
                :route="child"
                :is-expanded="isHovered" />
            <div class="side-bar-list-group__footer" />
        </ul>
    </li>
</template>

<script>
import {
    GREEN,
    GREY_DARK,
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import IconArrowDropDown from '@Core/components/Icons/Arrows/IconArrowDropDown';
import FadeSideBarTextTransition from '@Core/components/Transitions/FadeSideBarTextTransition';
import {
    ARROW,
} from '@Core/defaults/icons';

import AutoHeightTransition from '../Transitions/AutoHeightTransition';
import SideBarListGroupElement from './SideBarListGroupElement';

export default {
    name: 'SideBarListGroup',
    components: {
        AutoHeightTransition,
        FadeSideBarTextTransition,
        SideBarListGroupElement,
        IconArrowDropDown,
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
    .side-bar-list-group {
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
