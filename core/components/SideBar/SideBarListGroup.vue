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
                'side-bar-list-group--expanded': !isExpanded && isSelected,
            }
        ]"
        @mouseenter="() => isExpanded ? onMouseEnter() : onGroupSelect()"
        @mouseleave="() => isExpanded ? onMouseLeave() : onGroupSelect()">
        <div
            class="side-bar-list-group__activator"
            @click="() => isExpanded ? onGroupSelect() : null">
            <div class="side-bar-list-group__icon">
                <Component
                    :is="listIcon"
                    :fill-color="listIconFillColor" />
            </div>
            <template v-if="isExpanded">
                <span
                    class="side-bar-list-group__title"
                    v-text="route.group.title" />
                <IconArrowDropDown
                    :state="dropDownState"
                    :fill-color="dropdownIconFillColor" />
            </template>
        </div>
        <ul
            v-if="isSelected"
            class="side-bar-list-group__items">
            <div
                v-if="!isExpanded && isSelected"
                class="side-bar-list-group__expanded-title">
                <span
                    class="side-bar-list-group__title"
                    v-text="route.group.title" />
            </div>
            <SideBarListGroupElement
                v-for="(child, index) in route.routes"
                :key="index"
                :route="child"
                :is-expanded="!isExpanded && isSelected" />
        </ul>
    </li>
</template>

<script>
import { GREEN, WHITE, GREY_DARK } from '~/assets/scss/_variables/_colors.scss';
import { ARROW } from '~/defaults/icons';
import IconArrowDropDown from '../../../components/Icon/Arrows/IconArrowDropDown';
import SideBarListGroupElement from './SideBarListGroupElement';
import FadeTransition from '~/core/components/Transitions/FadeTransition';

export default {
    name: 'SideBarListGroup',
    components: { SideBarListGroupElement, IconArrowDropDown, FadeTransition },
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
            if (!this.route.group.icon) return null;

            return () => import(`~/components/Icon/Menu/Icon${this.route.group.icon}`);
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
            this.$emit('select', this.isSelected ? null : this.route.group.title);
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
        }

        &__items {
            background-color: $GRAPHITE_COAL;
        }
    }
</style>
