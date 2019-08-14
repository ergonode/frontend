/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab-bar">
        <div :class="['tab-bar__items', {'tab-bar__items--scrolling': isScrollingEnabled}]">
            <Button
                v-if="isScrollingEnabled"
                icon="arrow-dart trans-quarter"
                fab
                color="transparent"
                ripple-color="rgba(235, 235, 236, 1)"
                @click.native="scrollTo('back')" />
            <div
                :class="
                    [
                        'scrollbar',
                        'tab-bar__scrollable-container',
                        scrollableStateClasses,
                    ]"
                @scroll="onScroll">
                <HorizontalTabBarItem
                    v-for="(item, index) in items"
                    :key="index"
                    :index="index"
                    :is-selected="index === selectedTabIndex"
                    :item="item"
                    @select="onSelectTabBarItem" />
            </div>
            <Button
                v-if="isAddingNewTabEnabled"
                fab
                color="transparent"
                ripple-color="rgba(235, 235, 236, 1)"
                @click.native="addTab">
                <template v-slot:prepend>
                    <IconAdd fill-color="#5c5f65" />
                </template>
            </Button>
            <Button
                v-if="isScrollingEnabled"
                icon="arrow-dart trans-three-fourth"
                fab
                color="transparent"
                ripple-color="rgba(235, 235, 236, 1)"
                @click.native="scrollTo('forward')" />
        </div>
        <HorizontalTabContent :item="items[selectedTabIndex]" />
    </div>
</template>

<script>
import tabBarMixin from '~/mixins/tabBar/tabBarMixin';
import { rightBound, leftBound } from '~/model/scroll/boundaryScroll';

export default {
    name: 'HorizontalTabBar',
    components: {
        HorizontalTabContent: () => import('~/components/Tab/HorizontalTabContent'),
        HorizontalTabBarItem: () => import('~/components/Tab/HorizontalTabBarItem'),
        Button: () => import('~/components/Buttons/Button'),
        IconAdd: () => import('~/components/Icon/Actions/IconAdd'),
    },
    mixins: [tabBarMixin],
    data() {
        return {
            selectedTabIndex: 0,
            isLeftBoundReached: true,
            isRightBoundReached: true,
        };
    },
    computed: {
        scrollableStateClasses() {
            return {
                'tab-bar__scrollable-container--left-gradient': !this.isLeftBoundReached,
                'tab-bar__scrollable-container--right-gradient': !this.isRightBoundReached,
            };
        },
    },
    created() {
        this.selectedTabIndex = this.items.findIndex(item => item.path === this.$route.path);
    },
    methods: {
        onSelectTabBarItem(index) {
            this.selectedTabIndex = index;
        },
        onScroll(element) {
            const { target: { scrollWidth, offsetWidth, scrollLeft } } = element;

            this.isRightBoundReached = rightBound({
                xOffset: scrollLeft + offsetWidth,
                maxWidth: scrollWidth,
            });

            this.isLeftBoundReached = leftBound({
                xOffset: scrollLeft,
            });
        },
        determinateScrollingState() {
            const scrollableContainer = document.querySelector('.tab-bar__scrollable-container');
            const tabsContainer = document.querySelector('.tab-bar__items');
            const { scrollWidth: scrollableContainerScrollWidth } = scrollableContainer;
            const { scrollWidth: tabsContainerScrollWidth } = tabsContainer;
            const paddingValue = 2 * 21;
            const addBtnTabWidth = 32;
            const tabWidth = 165;
            const xOffset = paddingValue + tabWidth + addBtnTabWidth;

            if (scrollableContainerScrollWidth >= tabsContainerScrollWidth - xOffset) {
                this.isScrollingEnabled = true;
                this.isRightBoundReached = false;
            } else {
                this.isScrollingEnabled = false;
            }
        },
        scrollTo(side) {
            const tabWidth = 200;
            const scrollableContainer = document.querySelector('.tab-bar__scrollable-container');

            switch (side) {
            case 'back':
                scrollableContainer.scrollTo(scrollableContainer.scrollLeft - tabWidth, 0);
                break;
            case 'forward':
                scrollableContainer.scrollTo(scrollableContainer.scrollLeft + tabWidth, 0);
                break;
            default: break;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-bar {
        display: flex;
        flex-flow: column nowrap;
        flex: 1;

        &__items {
            position: relative;
            bottom: -1px;
            z-index: 2;
            display: flex;
            align-items: center;
            margin: 0 24px;

            & > button {
                flex-shrink: 0;
            }

            &--scrolling {
                margin: 0 6px;
            }
        }

        &__scrollable-container {
            position: relative;
            display: flex;
            margin: 0 4px;
            overflow-x: auto;

            &:before, &:after {
                position: fixed;
                z-index: -1;
                width: 34px;
                height: 42px;
                opacity: 0;
                content: "";
            }

            &:after {
                right: 74px;
                background: linear-gradient(90deg, rgba(248, 248, 248, 0) 0%, $white 100%);
            }

            &:before {
                left: 42px;
                background: linear-gradient(-90deg, rgba(248, 248, 248, 0) 0%, $white 100%);
            }

            &--left-gradient:before, &--right-gradient:after {
                z-index: 1;
                opacity: 1;
            }
        }
    }
</style>
