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
            <div class="side-bar-list-group__icon">
                <Component
                    :is="listIcon"
                    :fill-color="listIconFillColor" />
            </div>
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
        <ul
            v-if="isSelected || (!isExpanded && isHovered)"
            class="side-bar-list-group__items">
            <div
                v-if="!isExpanded && isHovered"
                class="side-bar-list-group__expanded-title">
                <span
                    class="side-bar-list-group__title"
                    v-text="route.group.title" />
            </div>
            <SideBarListGroupElement
                v-for="(child, index) in route.routes"
                :key="index"
                :route="child"
                :is-expanded="!isExpanded && isHovered" />
        </ul>
    </li>
</template>

<script>
import { GREEN, WHITE, GREY_DARK } from '~/assets/scss/_variables/_colors.scss';
import { ARROW } from '~/defaults/icons';
import IconArrowDropDown from '../../../components/Icon/Arrows/IconArrowDropDown';
import SideBarListGroupElement from './SideBarListGroupElement';
import FadeSideBarTextTransition from '~/core/components/Transitions/FadeSideBarTextTransition';

export default {
    name: 'SideBarListGroup',
    components: {
        FadeSideBarTextTransition, SideBarListGroupElement, IconArrowDropDown,
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
            return this.route.routes.some((route) => this.$route.path.includes(route.path));
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
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__expanded-title {
            display: flex;
            align-items: center;
            height: 48px;
            padding: 0 16px 0 12px;
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
    }
</style>
