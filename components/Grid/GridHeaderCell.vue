/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['header-cell', { 'draggable': !isPinnedColumn && isColumnEditable }]">
        <span
            class="header-cell__title txt-fixed"
            v-text="title" />
        <div
            v-if="!isPinnedColumn"
            :class="[
                'horizontal-wrapper',
                {
                    'horizontal-wrapper--active': isContextualMenuActive,
                    'horizontal-wrapper--sorted': isSorted,
                }
            ]">
            <Icon
                :icon="sortingIcon"
                @click.native="onClickSort" />
            <ButtonSelect
                v-if="isColumnEditable"
                v-visible="isContextualMenuActive || isSorted || isMouseOver"
                icon-path="Others/IconDots"
                :options="contextualMenuItems"
                @input="onSelectValue"
                @focus="onSelectFocus" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import {
    removeColumnCookieByID,
} from '~/model/grid/cookies/GridLayoutConfiguration';

export default {
    name: 'GridHeaderCell',
    components: {
        ButtonSelect: () => import('~/components/Inputs/Select/ButtonSelect'),
        Icon: () => import('~/components/Icon/Icon'),
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
            contextualMenuItems: ['Remove'],
            isContextualMenuActive: false,
            isMouseOver: false,
        };
    },
    mounted() {
        if (!this.isPinnedColumn) {
            this.$el.addEventListener('mouseenter', this.onMouseEnter);
            this.$el.addEventListener('mouseleave', this.onMouseLeave);
        }
    },
    destroyed() {
        if (!this.isPinnedColumn) {
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
        isPinnedColumn() {
            const { isLeftPinned, isRightPinned } = this.column;
            return isLeftPinned || isRightPinned;
        },
        isSorted() {
            return this.gridState.sortedByColumn.index === this.column.id;
        },
        sortingIcon() {
            if (this.isSorted) {
                if (this.gridState.sortedByColumn.orderState === 'ASC') {
                    return 'arrow-sort-active';
                }
                if (this.gridState.sortedByColumn.orderState === 'DESC') {
                    return 'arrow-sort-active trans-half';
                }
            }

            return 'arrow-sort';
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
            if (type === 'ACTION' && label === null) {
                return 'Edit';
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
            let orderState = 'ASC';
            if (this.isSorted) {
                if (this.gridState.sortedByColumn.orderState === 'ASC') {
                    orderState = 'DESC';
                }
                if (this.gridState.sortedByColumn.orderState === 'DESC') {
                    orderState = 'ASC';
                }
            }
            this.$store.dispatch(`${this.storeNamespace}/setSortingState`, { index: this.column.id, orderState });

            this.$emit('sort');
        },
        onSelectFocus(isFocused) {
            this.isContextualMenuActive = isFocused;
            if (!this.isContextualMenuActive) {
                this.setHorizontalWrapperOpacityIfNeeded(0);
            }
        },
        onSelectValue(value) {
            // TODO: It is going to be populated in next tasks, when we will assign actions for selected items
            if (value === 'Remove') {
                const columnElement = this.getColumnAtIndex(this.columnIndex);

                // We are hovering element while removing it
                this.borderColumnAction('add', columnElement);
                this.$store.dispatch(`${this.storeNamespace}/removeColumnAtIndex`, { index: this.columnIndex });
                removeColumnCookieByID(this.$cookies, this.column.id);
            }
        },
        getColumnAtIndex(index) {
            const gridElement = document.querySelector('.grid');
            const { children: { [index]: columnElement } } = gridElement;

            return columnElement;
        },
        onMouseEnter() {
            if (this.title === '' || this.isColumnDragging) return;

            const columnElement = this.getColumnAtIndex(this.columnIndex);

            columnElement.classList.add('hover');
            this.isMouseOver = true;
            this.borderColumnAction('remove', columnElement);
            this.setHorizontalWrapperOpacityIfNeeded(1);
        },
        onMouseLeave() {
            if (this.title === '' || this.isColumnDragging) return;

            const columnElement = this.getColumnAtIndex(this.columnIndex);

            columnElement.classList.remove('hover');
            this.isMouseOver = false;
            this.borderColumnAction('add', columnElement);
            if (!this.isContextualMenuActive) {
                this.setHorizontalWrapperOpacityIfNeeded(0);
            }
        },
        setHorizontalWrapperOpacityIfNeeded(opacity) {
            if (!this.isSorted && !this.isPinnedColumn) {
                const horizontalWrapperElement = this.$el.querySelector('.horizontal-wrapper');
                horizontalWrapperElement.style.opacity = opacity;
            }
        },
        borderColumnAction(action, columnElement) {
            const gridElement = document.querySelector('.grid');
            const { children: columns } = gridElement;

            const indexOfThisElement = [...columns].indexOf(columnElement);

            if (indexOfThisElement - 1 > -1) {
                columns[indexOfThisElement - 1].classList[action]('column--border-right');
            }
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
        padding: 8px;
        user-select: none;
        pointer-events: auto;

        &__title {
            @include setFont(bold, small, regular, $graphite);

            flex: 1 1 auto;
            width: 0;
        }

        .draggable {
            cursor: grab;
        }

        .horizontal-wrapper {
            display: flex;
            align-items: center;
            margin: 0 -8px 0 8px;

            & > i {
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
