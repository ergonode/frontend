/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <aside :class="['side-bar', {'side-bar--expanded': isExpanded}]">
        <ol class="side-bar__menu">
            <li>
                <SideBarLogo :is-expanded="isExpanded" />
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
        <div class="side-bar__expand-btn">
            <FabButton
                :theme="secondaryTheme"
                :plain="true"
                @click.native="onExpand">
                <template #icon>
                    <IconArrowDouble
                        :fill-color="whiteColor"
                        :state="expendStateIcon" />
                </template>
            </FabButton>
        </div>
    </aside>
</template>

<script>
import { THEMES } from '@Core/defaults/buttons';
import { ARROW } from '~/defaults/icons';
import { GREEN, WHITE } from '~/assets/scss/_variables/_colors.scss';
import IconArrowDouble from '~/components/Icon/Arrows/IconArrowDouble';
import FabButton from '@Core/components/Buttons/FabButton';
import SideBarLogo from '@Core/components/SideBar/SideBarLogo';
import SideBarListElement from './SideBarListElement';
import SideBarListGroup from './SideBarListGroup';

export default {
    name: 'SideBar',
    components: {
        SideBarLogo,
        SideBarListElement,
        SideBarListGroup,
        IconArrowDouble,
        FabButton,
    },
    data() {
        return {
            isSelected: true,
            isExpanded: true,
            selectedGroup: null,
        };
    },
    destroyed() {
        window.removeEventListener('click', this.onClickOutside);
    },
    computed: {
        expendStateIcon() {
            return this.isExpanded ? ARROW.LEFT : ARROW.RIGHT;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
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
                    || this.$hasAccess([route.meta.privileges.read]))) {
                    if (route.meta.group && !groups[route.meta.group.title]) {
                        routes.push({
                            group: { ...route.meta.group },
                            routes: [route],
                        });
                        groups[route.meta.group.title] = true;
                    } else if (route.meta.group && groups[route.meta.group.title]) {
                        const index = routes
                            .findIndex((r) => r.group && r.group.title === route.meta.group.title);

                        routes[index].routes.push({ ...route });
                    } else {
                        routes.push({ ...route });
                    }
                }
            });

            return routes;
        },
    },
    methods: {
        onExpand() {
            this.isExpanded = !this.isExpanded;
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
        $sidebar: &;

        position: relative;
        z-index: $Z_INDEX_NAV;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
        background-color: $GRAPHITE_DARK;
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        overflow-x: hidden;
        overflow-y: auto;

        &--expanded {
            width: 256px;

            #{$sidebar}__expand-btn {
                align-self: flex-end;
                transform: translateX(-20px);
            }
        }

        &:not(&--expanded) {
            width: 80px;

            #{$sidebar}__expand-btn {
                align-self: center;
            }
        }

        &__menu {
            margin-bottom: 24px;
        }

        &__expand-btn {
            position: sticky;
            bottom: 20px;
            border-radius: 16px;

            &:hover {
                background-color: $GREEN;
            }
        }
    }
</style>
