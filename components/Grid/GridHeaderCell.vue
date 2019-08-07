/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['header-cell', { 'draggable': !pinnedColumn && isColumnEditable }]">
        <GridHeaderTitle :header="title" />
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
                fill-color="#85878B"
                @click.native="onClickSort" />
            <ButtonSelect
                v-if="isColumnEditable"
                icon-path="Others/IconDots"
                :options="contextualMenuItems"
                @focus="onSelectFocus">
                <template v-slot:content>
                    <List>
                        <ListElement
                            v-for="option in contextualMenuItems"
                            :key="option.text"
                            regular
                            @click.native="() => onSelectOption(option)">
                            <ListElementDescription
                                :subtitle="option.text"
                                subtitle-color="txt--graphite" />
                            <CheckBox
                                v-if="option.text !== 'Remove'"
                                ref="checkbox"
                                :value="option.value" />
                        </ListElement>
                    </List>
                </template>
            </ButtonSelect>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import {
    removeColumnCookieByID,
} from '~/model/grid/cookies/GridLayoutConfiguration';
import { SortingOrder } from '~/model/icons/SortingOrder';
import { PinnedColumnState } from '~/model/grid/layout/PinnedColumnState';

export default {
    name: 'GridHeaderCell',
    components: {
        ButtonSelect: () => import('~/components/Inputs/Select/ButtonSelect'),
        IconArrowSort: () => import('~/components/Icon/Arrows/IconArrowSort'),
        List: () => import('~/components/List/List'),
        ListElement: () => import('~/components/List/ListElement'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
        CheckBox: () => import('~/components/Inputs/CheckBox'),
        GridHeaderTitle: () => import('~/components/Grid/GridHeaderTitle'),
    },
    props: {
        storeNamespace: {
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

            if (state === PinnedColumnState.LEFT) this.contextualMenuItems[1].value = true;
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
            isColumnDragging: state => state.isColumnDragging,
        }),
        gridState() {
            return this.$store.state[this.storeNamespace];
        },
        pinnedColumn() {
            if (!this.gridState) return null;
            const pinnedColumn = this.gridState.pinnedColumns[this.column.id];

            if (!pinnedColumn) return null;

            return pinnedColumn;
        },
        isSorted() {
            return this.gridState.sortedByColumn.index === this.column.id;
        },
        sortingOrder() {
            if (!this.isSorted) return null;

            return this.gridState.sortedByColumn.orderState;
        },
        title() {
            const {
                id,
                type,
                label,
                language,
                parameter,
            } = this.column;
            let suffix = '';
            const columnIDs = id.split(':');

            if (type === 'PRICE') {
                suffix = parameter.currency;
            }

            if (!language) {
                return `${label} ${suffix}`;
            }

            if (columnIDs.length > 1) {
                return `${label || id} ${suffix}`;
            }

            return label
                ? `${label} ${language} ${suffix}`
                : `${id} ${language} ${suffix}`;
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
            let orderState = SortingOrder.ASC;
            if (this.isSorted) {
                if (this.gridState.sortedByColumn.orderState === SortingOrder.ASC) {
                    orderState = SortingOrder.DESC;
                }
                if (this.gridState.sortedByColumn.orderState === SortingOrder.DESC) {
                    orderState = SortingOrder.ASC;
                }
            }
            this.$store.dispatch(`${this.storeNamespace}/setSortingState`, { index: this.column.id, orderState });

            this.$emit('sort');
        },
        onSelectFocus(isFocused) {
            this.isContextualMenuActive = isFocused;
            if (!this.isContextualMenuActive && !this.isMouseOver) {
                this.resetColumnHoveringState();
            }
        },
        onSelectOption(option) {
            switch (option.text) {
            case 'Remove': {
                const columnElement = this.getColumnAtIndex(this.columnIndex);

                // We are hovering element while removing it
                this.borderColumnAction('add', columnElement);
                this.$store.dispatch(`${this.storeNamespace}/removeColumnAtIndex`, { index: this.columnIndex });
                removeColumnCookieByID(this.$cookies, this.column.id);
                break;
            }
            case 'Pin to left':
                this.pinOrRemovePinnedColumn(!option.value, PinnedColumnState.LEFT);
                this.contextualMenuItems[1].value = !option.value;
                break;
            case 'Pin to right':
                this.pinOrRemovePinnedColumn(!option.value, PinnedColumnState.RIGHT);
                this.contextualMenuItems[2].value = !option.value;
                break;
            default: break;
            }
        },
        pinOrRemovePinnedColumn(pinned, state) {
            const columnPosition = `${this.columnIndex + 1} / ${this.columnIndex + 2}`;

            if (pinned) this.$store.dispatch(`${this.storeNamespace}/addPinnedColumn`, { id: this.column.id, state, position: columnPosition });
            else this.$store.dispatch(`${this.storeNamespace}/removePinnedColumn`, this.column.id);
        },
        getColumnAtIndex(index) {
            const gridElement = document.querySelector('.grid');
            const { children: { [index]: columnElement } } = gridElement;

            return columnElement;
        },
        onMouseEnter() {
            if (this.isColumnDragging || this.isMenuSelected()) return;

            const columnElement = this.getColumnAtIndex(this.columnIndex);

            columnElement.classList.add('hover');
            this.isMouseOver = true;
            this.borderColumnAction('remove', columnElement);
            this.setHorizontalWrapperOpacityIfNeeded(1);
        },
        onMouseLeave() {
            this.isMouseOver = false;

            if (this.isColumnDragging || this.isMenuSelected()) return;

            this.resetColumnHoveringState();
        },
        setHorizontalWrapperOpacityIfNeeded(opacity) {
            if (!this.isSorted && !this.pinnedColumn) {
                const horizontalWrapperElement = this.$el.querySelector('.horizontal-wrapper');
                horizontalWrapperElement.style.opacity = opacity;
            }
        },
        borderColumnAction(action, columnElement) {
            const gridElement = document.querySelector('.grid');
            const { children: columns } = gridElement;

            const indexOfThisElement = [...columns].indexOf(columnElement);

            if (indexOfThisElement - 1 > -1) {
                columns[indexOfThisElement - 1].classList[action]('border-right');
                columns[indexOfThisElement].classList[action]('border-right');
            }
        },
        isMenuSelected() {
            const gridElement = document.querySelector('.grid');
            const headerEls = gridElement.querySelectorAll('.horizontal-wrapper--active');

            return headerEls.length;
        },
        resetColumnHoveringState() {
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
