/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['header-cell',
                 { 'draggable': !pinnedColumn && isColumnEditable && !isCellEditing }
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
import { PINNED_COLUMN_STATE } from '~/defaults/grid';
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
                // TODO: Add it whenever we finish dynamic pinning columns
                // { text: 'Pin to left', value: false },
                // { text: 'Pin to right', value: false },
            ],
            isContextualMenuActive: false,
            isMouseOver: false,
        };
    },
    created() {
        if (this.pinnedColumn) {
            const { state } = this.pinnedColumn;

            if (state === PINNED_COLUMN_STATE.LEFT) this.contextualMenuItems[1].value = true;
            else this.contextualMenuItems[2].value = true;
        }
    },
    mounted() {
        if (!this.pinnedColumn) {
            this.$el.addEventListener('mouseenter', this.onMouseEnter);
            this.$el.addEventListener('mouseleave', this.onMouseLeave);
        }
    },
    destroyed() {
        if (!this.pinnedColumn) {
            this.$el.removeEventListener('mouseenter', this.onMouseEnter);
            this.$el.removeEventListener('mouseleave', this.onMouseLeave);
        }
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
        pinnedColumn() {
            if (!this.gridState) return null;
            const pinnedColumn = this.gridState.pinnedColumns[this.column.id];

            if (!pinnedColumn) return null;

            return pinnedColumn;
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
                const columnElement = this.getColumnAtIndex(this.columnIndex);

                // We are hovering element while removing it
                this.borderColumnAction('add', columnElement);
                this.$store.dispatch(`${this.namespace}/removeColumnAtIndex`, this.columnIndex - 1);
                this.$store.dispatch(`${this.namespace}/removeColumnWidthAtIndex`, this.columnIndex - 1);
                removeColumnCookieByID(this.$cookies, this.column.id);
                this.$emit('focus', false);
                break;
            }
            case 'Pin to left':
                this.pinOrRemovePinnedColumn(!option.value, PINNED_COLUMN_STATE.LEFT);
                this.contextualMenuItems[1].value = !option.value;
                break;
            case 'Pin to right':
                this.pinOrRemovePinnedColumn(!option.value, PINNED_COLUMN_STATE.RIGHT);
                this.contextualMenuItems[2].value = !option.value;
                break;
            default: break;
            }
        },
        pinOrRemovePinnedColumn(pinned, state) {
            const columnPosition = `${this.columnIndex + 1} / ${this.columnIndex + 2}`;

            if (pinned) this.$store.dispatch(`${this.namespace}/addPinnedColumn`, { id: this.column.id, state, position: columnPosition });
            else this.$store.dispatch(`${this.namespace}/removePinnedColumn`, this.column.id);
        },
        getColumnAtIndex(index) {
            const contentGrid = document.querySelector('.grid__content');
            const { children } = contentGrid;

            return children[index];
        },
        onMouseEnter() {
            if (this.draggedElementOnGrid || this.isMenuSelected() || this.isCellEditing) return;

            const columnElement = this.getColumnAtIndex(this.columnIndex);

            columnElement.classList.add('hover');
            this.isMouseOver = true;
            this.borderColumnAction('remove', columnElement);
            this.setHorizontalWrapperOpacityIfNeeded(1);
        },
        onMouseLeave() {
            this.isMouseOver = false;

            if (this.draggedElementOnGrid || this.isMenuSelected() || this.isCellEditing) return;

            this.removeColumnHover();
        },
        setHorizontalWrapperOpacityIfNeeded(opacity) {
            if (!this.isSorted && !this.pinnedColumn) {
                const horizontalWrapperElement = this.$el.querySelector('.horizontal-wrapper');
                horizontalWrapperElement.style.opacity = opacity;
            }
        },
        borderColumnAction(action, columnElement) {
            const contentGrid = document.querySelector('.grid__content');
            const { children: columns } = contentGrid;

            const indexOfThisElement = [...columns].indexOf(columnElement);

            if (indexOfThisElement - 1 > -1) {
                columns[indexOfThisElement - 1].classList[action]('border-right');
                columns[indexOfThisElement].classList[action]('border-right');
            }
        },
        isMenuSelected() {
            const contentGrid = document.querySelector('.grid__content');
            const headerEls = contentGrid.querySelectorAll('.horizontal-wrapper--active');

            return headerEls.length;
        },
        removeColumnHover() {
            const columnElement = this.getColumnAtIndex(this.columnIndex);

            columnElement.classList.remove('hover');
            this.borderColumnAction('add', columnElement);
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
