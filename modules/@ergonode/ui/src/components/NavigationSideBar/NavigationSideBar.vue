/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <nav :class="classes">
        <ol class="navigation-side-bar__menu">
            <li>
                <NuxtLink
                    aria-label="Menu list element"
                    to="/dashboard">
                    <NavigationSideBarLogo :is-expanded="isExpanded" />
                </NuxtLink>
            </li>
            <template v-for="(route, index) in routes">
                <NavigationSideBarGroup
                    v-if="route.group"
                    :key="index"
                    :route="route"
                    :children-queries="childrenQueries"
                    :is-expanded="isExpanded"
                    :is-selected="isGroupSelected(route.group.title)"
                    @select="onGroupSelect" />
                <NavigationSideBarElement
                    v-else
                    :key="index"
                    :route="getRoute(route)"
                    :is-expanded="isExpanded" />
            </template>
        </ol>
        <Fab
            :floating="{ bottom: '16px', left: '24px' }"
            :theme="secondaryTheme"
            @click.native="onExpand">
            <template #icon="{ isHovered, color }">
                <IconArrowDouble
                    :fill-color="isHovered ? color : whiteColor"
                    :state="expendStateIcon" />
            </template>
        </Fab>
    </nav>
</template>

<script>
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    THEME,
} from '@Core/defaults/theme';
import {
    GREEN,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import NavigationSideBarElement from '@UI/components/NavigationSideBar/NavigationSideBarElement';
import NavigationSideBarGroup from '@UI/components/NavigationSideBar/NavigationSideBarGroup';
import NavigationSideBarLogo from '@UI/components/NavigationSideBar/NavigationSideBarLogo';

export default {
    name: 'NavigationSideBar',
    components: {
        NavigationSideBarLogo,
        NavigationSideBarElement,
        NavigationSideBarGroup,
    },
    data() {
        return {
            childrenQueries: {},
            isSelected: true,
            isExpanded: true,
            selectedGroup: null,
        };
    },
    computed: {
        classes() {
            return [
                'navigation-side-bar',
                {
                    'navigation-side-bar--expanded': this.isExpanded,
                },
            ];
        },
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
                    if (route.meta.group && !groups[route.meta.group.id]) {
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
                        groups[route.meta.group.id] = true;
                    } else if (route.meta.group && groups[route.meta.group.id]) {
                        const index = routes
                            .findIndex(r => r.group && r.group.id === route.meta.group.id);

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
    watch: {
        $route(to, from) {
            this.childrenQueries = {
                ...this.childrenQueries,
                [from.name]: {
                    ...from.query,
                },
            };
        },
    },
    beforeDestroy() {
        window.removeEventListener('click', this.onClickOutside);
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
    .navigation-side-bar {
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
            padding-bottom: 48px;
            overflow-x: hidden;
            overflow-y: auto;
        }
    }
</style>
