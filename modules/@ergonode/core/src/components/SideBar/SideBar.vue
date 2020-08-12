/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <aside :class="['side-bar', {'side-bar--expanded': isExpanded}]">
        <ol class="side-bar__menu">
            <li>
                <NuxtLink to="/dashboard">
                    <SideBarLogo :is-expanded="isExpanded" />
                </NuxtLink>
            </li>
            <template v-for="(route, index) in routes">
                <SideBarListGroup
                    v-if="route.group"
                    :key="index"
                    :route="route"
                    :is-expanded="isExpanded"
                    :is-selected="isGroupSelected(route.group.title)"
                    @select="onGroupSelect" />
                <SideBarListElement
                    v-else
                    :key="index"
                    :route="route"
                    :is-expanded="isExpanded" />
            </template>
        </ol>
        <div class="side-bar__expand-button">
            <Fab
                :theme="secondaryTheme"
                @click.native="onExpand">
                <template #icon="{ isHovered, color }">
                    <IconArrowDouble
                        :fill-color="isHovered ? color : whiteColor"
                        :state="expendStateIcon" />
                </template>
            </Fab>
        </div>
    </aside>
</template>

<script>
import {
    GREEN,
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Fab from '@Core/components/Fab/Fab';
import IconArrowDouble from '@Core/components/Icons/Arrows/IconArrowDouble';
import SideBarListElement from '@Core/components/SideBar/SideBarListElement';
import SideBarListGroup from '@Core/components/SideBar/SideBarListGroup';
import SideBarLogo from '@Core/components/SideBar/SideBarLogo';
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'SideBar',
    components: {
        SideBarLogo,
        SideBarListElement,
        SideBarListGroup,
        IconArrowDouble,
        Fab,
    },
    data() {
        return {
            isSelected: true,
            isExpanded: true,
            selectedGroup: null,
        };
    },
    computed: {
        expendStateIcon() {
            return this.isExpanded ? ARROW.LEFT : ARROW.RIGHT;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        greenColor() {
            return GREEN;
        },
        whiteColor() {
            return WHITE;
        },
        routes() {
            const routes = [];
            const groups = {};

            this.$router.options.routes.forEach((route) => {
                if (route.meta && route.meta.isMenu && (!route.meta.privileges
                    || this.$hasAccess([
                        route.meta.privileges.read,
                    ]))) {
                    if (route.meta.group && !groups[route.meta.group.title]) {
                        const routeData = {
                            group: {
                                ...route.meta.group,
                            },
                            routes: [
                                route,
                            ],
                        };
                        if (route.meta.group.menuPosition) {
                            routeData.menuPosition = route.meta.group.menuPosition;
                        }
                        routes.push(routeData);
                        groups[route.meta.group.title] = true;
                    } else if (route.meta.group && groups[route.meta.group.title]) {
                        const index = routes
                            .findIndex(r => r.group && r.group.title === route.meta.group.title);

                        routes[index].routes.push({
                            ...route,
                        });
                    } else {
                        routes.push({
                            ...route,
                            menuPosition: route.meta.menuPosition,
                        });
                    }
                }
            });
            const subMenuSorted = routes.map((route) => {
                if (route.routes) {
                    return {
                        ...route,
                        routes: this.sortRoutes(route.routes, true),
                    };
                }
                return route;
            });

            return this.sortRoutes(subMenuSorted);
        },
    },
    beforeDestroy() {
        window.removeEventListener('click', this.onClickOutside);
    },
    methods: {
        sortRoutes(routes, subMenu = false) {
            const unsetPosition = 999;

            return routes.sort((a, b) => {
                let routeA = a.menuPosition || unsetPosition;
                let routeB = b.menuPosition || unsetPosition;

                if (subMenu) {
                    routeA = a.meta.menuPosition || unsetPosition;
                    routeB = b.meta.menuPosition || unsetPosition;
                }

                return routeA - routeB;
            });
        },
        onExpand() {
            this.isExpanded = !this.isExpanded;

            this.$emit('expand', this.isExpanded);
        },
        onGroupSelect(group) {
            this.selectedGroup = group;
        },
        isGroupSelected(groupTitle) {
            return this.selectedGroup === groupTitle && this.isExpanded;
        },
    },
};
</script>

<style lang="scss" scoped>
    .side-bar {
        position: relative;
        z-index: $Z_INDEX_NAV;
        display: flex;
        flex-shrink: 0;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
        background-color: $GRAPHITE_DARK;
        box-shadow: $ELEVATOR_2_DP;
        transition: width 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        will-change: width;
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;

        &--expanded {
            width: 256px;
        }

        &:not(&--expanded) {
            width: 80px;
        }

        &__menu {
            margin-bottom: 24px;
        }

        &__expand-button {
            position: sticky;
            left: 24px;
            bottom: 20px;
            width: 32px;
            border-radius: 16px;
            transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

            &:hover {
                background-color: $GREEN;
            }
        }
    }
</style>
