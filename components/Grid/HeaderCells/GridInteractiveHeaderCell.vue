/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['header-cell',
                 { 'draggable': isColumnEditable && !isCellEditing }
        ]">
        <GridBaseHeaderCell :header="column.header.title" />
        <div
            :class="[
                'horizontal-wrapper',
                {
                    'horizontal-wrapper--active': isContextualMenuActive,
                    'horizontal-wrapper--sorted': isSorted,
                }
            ]">
            <IconArrowSort
                :sorting-order="sortingOrder"
                :fill-color="graphiteLightColor"
                @click.native="onClickSort" />
            <MultiButton
                v-if="isColumnEditable"
                :theme="secondaryTheme"
                :size="smallSize"
                :plain="true"
                @focus="onSelectFocus">
                <template #icon="{ color }">
                    <IconDots :fill-color="color" />
                </template>
                <template #content>
                    <List>
                        <ListElement
                            v-for="option in contextualMenuItems"
                            :key="option.text"
                            @click.native="() => onSelectOption(option)">
                            <ListElementDescription>
                                <ListElementTitle :title="option.text" />
                            </ListElementDescription>
                            <CheckBox
                                v-if="option.text !== 'Remove'"
                                ref="checkbox"
                                :value="option.value" />
                        </ListElement>
                    </List>
                </template>
            </MultiButton>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { SIZES, THEMES } from '~/defaults/buttons';
import {
    removeColumnCookieByID,
} from '~/model/grid/cookies/GridLayoutConfiguration';
import { SORTING_ORDER } from '~/defaults/icons';
import { GRAPHITE_LIGHT } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'GridInteractiveHeaderCell',
    components: {
        MultiButton: () => import('~/components/Buttons/MultiButton'),
        IconArrowSort: () => import('~/components/Icon/Arrows/IconArrowSort'),
        IconDots: () => import('~/components/Icon/Others/IconDots'),
        List: () => import('~/components/List/List'),
        ListElement: () => import('~/components/List/ListElement'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
        ListElementTitle: () => import('~/components/List/ListElementTitle'),
        CheckBox: () => import('~/components/Inputs/CheckBox'),
        GridBaseHeaderCell: () => import('~/components/Grid/HeaderCells/GridBaseHeaderCell'),
    },
    props: {
        namespace: {
            type: String,
            required: true,
        },
        column: {
            type: Object,
            required: true,
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        isColumnEditable: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            contextualMenuItems: [
                { text: 'Remove' },
            ],
            isContextualMenuActive: false,
            isMouseOver: false,
        };
    },
    mounted() {
        this.$el.addEventListener('mouseenter', this.onMouseEnter);
        this.$el.addEventListener('mouseleave', this.onMouseLeave);
    },
    destroyed() {
        this.$el.removeEventListener('mouseenter', this.onMouseEnter);
        this.$el.removeEventListener('mouseleave', this.onMouseLeave);
    },
    computed: {
        ...mapState('draggable', {
            draggedElementOnGrid: (state) => state.draggedElementOnGrid,
        }),
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        graphiteLightColor() {
            return GRAPHITE_LIGHT;
        },
        gridState() {
            return this.$store.state[this.namespace];
        },
        isCellEditing() {
            return Object.keys(this.gridState.editingCellCoordinates).length;
        },
        isSorted() {
            return this.gridState.sortedByColumn.index === this.column.id;
        },
        sortingOrder() {
            if (!this.isSorted) return null;

            return this.gridState.sortedByColumn.orderState;
        },
    },
    watch: {
        isSorted() {
            if (!this.isMouseOver) {
                this.setHorizontalWrapperOpacityIfNeeded(+this.isSorted);
            }
        },
    },
    methods: {
        onClickSort() {
            let orderState = SORTING_ORDER.ASC;
            if (this.isSorted) {
                if (this.gridState.sortedByColumn.orderState === SORTING_ORDER.ASC) {
                    orderState = SORTING_ORDER.DESC;
                }
                if (this.gridState.sortedByColumn.orderState === SORTING_ORDER.DESC) {
                    orderState = SORTING_ORDER.ASC;
                }
            }
            this.$store.dispatch(`${this.namespace}/setSortingState`, { index: this.column.id, orderState });

            this.$emit('sort');
        },
        onSelectFocus(isFocused) {
            this.isContextualMenuActive = isFocused;
            if (!this.isContextualMenuActive && !this.isMouseOver) {
                this.removeColumnHover();
            }

            this.$emit('focus', isFocused);
        },
        onSelectOption(option) {
            switch (option.text) {
            case 'Remove': {
                // We are hovering element while removing it
                this.$store.dispatch(`${this.namespace}/removeColumnAtIndex`, this.columnIndex - 1);
                this.$store.dispatch(`${this.namespace}/removeColumnWidthAtIndex`, this.columnIndex - 1);
                removeColumnCookieByID(this.$cookies, this.column.id);
                this.$emit('focus', false);
                break;
            }
            default: break;
            }
        },
        getColumnAtIndex(index) {
            const contentGrid = document.querySelector('.grid__content');
            const { children } = contentGrid;

            return children[index];
        },
        onMouseEnter() {
            if (this.draggedElementOnGrid || this.isMenuSelected() || this.isCellEditing) return;

            const columnElement = this.getColumnAtIndex(this.columnIndex);

            columnElement.classList.add('column--hovered');
            this.isMouseOver = true;
            this.setHorizontalWrapperOpacityIfNeeded(1);
        },
        onMouseLeave() {
            this.isMouseOver = false;

            if (this.draggedElementOnGrid || this.isMenuSelected() || this.isCellEditing) return;

            this.removeColumnHover();
        },
        setHorizontalWrapperOpacityIfNeeded(opacity) {
            if (!this.isSorted) {
                const horizontalWrapperElement = this.$el.querySelector('.horizontal-wrapper');
                horizontalWrapperElement.style.opacity = opacity;
            }
        },
        isMenuSelected() {
            const contentGrid = document.querySelector('.grid__content');
            const headerEls = contentGrid.querySelectorAll('.horizontal-wrapper--active');

            return headerEls.length;
        },
        removeColumnHover() {
            const columnElement = this.getColumnAtIndex(this.columnIndex);

            columnElement.classList.remove('column--hovered');
            this.setHorizontalWrapperOpacityIfNeeded(0);
        },
    },
};
</script>

<style lang="scss" scoped>
    .header-cell {
        $cell: &;

        position: relative;
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        background-color: $WHITESMOKE;
        user-select: none;
        pointer-events: auto;

        &.draggable {
            cursor: grab;
        }

        .horizontal-wrapper {
            display: flex;
            align-items: center;

            & > i, & > svg {
                cursor: pointer;
            }

            &:not(&--active) {
                opacity: 0;
            }

            &--active, &--sorted {
                opacity: 1;
            }
        }
    }
</style>
