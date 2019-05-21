/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['header-cell', { 'header-cell--draggable': !isPinnedColumn && isColumnEditable }]"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <span
            v-if="title && title !== 'extender'"
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
                v-show="isContextualMenuActive || !isSorted || isMouseOver"
                :icon="contextualMenuStateIcon"
                :options="contextualMenuItems"
                @input="onSelectValue"
                @focus="onSelectFocus" />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'GridHeaderCell',
    components: {
        ButtonSelect: () => import('~/components/Inputs/Select/ButtonSelect'),
        Icon: () => import('~/components/Icon/Icon'),
    },
    props: {
        title: {
            type: String,
            required: false,
            default: '',
        },
        columnId: {
            type: String,
            required: true,
        },
        column: {
            type: Number,
            required: true,
        },
        isPinnedColumn: {
            type: Boolean,
            required: false,
            default: false,
        },
        isColumnEditable: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data: () => ({
        contextualMenuItems: ['Remove'],
        isContextualMenuActive: false,
        isMouseOver: false,
    }),
    computed: {
        ...mapState('draggable', {
            isColumnDragging: state => state.isColumnDragging,
        }),
        ...mapState('grid', {
            sortedByColumn: state => state.sortedByColumn,
        }),
        contextualMenuStateIcon() {
            return this.isContextualMenuActive
                ? 'sprite-system system-dots--selected'
                : 'sprite-system system-dots--deactive';
        },
        isSorted() {
            return this.sortedByColumn.index === this.columnId;
        },
        sortingIcon() {
            if (this.isSorted) {
                if (this.sortedByColumn.orderState === 'ASC') {
                    return 'arrow-sort-active';
                }
                if (this.sortedByColumn.orderState === 'DESC') {
                    return 'arrow-sort-active trans-half';
                }
            }

            return 'arrow-sort';
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
        ...mapActions('grid', [
            'removeColumnAtIndex',
            'setSortingState',
        ]),
        onClickSort() {
            let orderState = 'ASC';
            if (this.isSorted) {
                if (this.sortedByColumn.orderState === 'ASC') {
                    orderState = 'DESC';
                }
                if (this.sortedByColumn.orderState === 'DESC') {
                    orderState = 'ASC';
                }
            }
            this.setSortingState({ index: this.columnId, orderState });

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
                const columnElement = this.getColumnAtIndex(this.column);

                // We are hovering element while removing it
                this.borderColumnAction('add', columnElement);
                this.removeColumnAtIndex({ index: this.column });
                this.removeIDFromColumnsIDCookie({ index: this.column });
            }
        },
        removeIDFromColumnsIDCookie({ index }) {
            const columnsIDCookie = this.$cookies.get('columnsID');
            if (columnsIDCookie) {
                const parsedColumnsID = columnsIDCookie.split(',').splice(index, 0).join(',');
                this.$cookies.set('columnsID', parsedColumnsID);
            }
        },
        getColumnAtIndex(index) {
            const gridElement = document.querySelector('.grid');
            const { children: { [index]: columnElement } } = gridElement;

            return columnElement;
        },
        onMouseEnter() {
            if (this.title === '' || this.isColumnDragging) return;

            const columnElement = this.getColumnAtIndex(this.column);

            columnElement.classList.add('hover');
            this.isMouseOver = true;
            this.borderColumnAction('remove', columnElement);
            this.setHorizontalWrapperOpacityIfNeeded(1);
        },
        onMouseLeave() {
            if (this.title === '' || this.isColumnDragging) return;

            const columnElement = this.getColumnAtIndex(this.column);

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

        &__title {
            @include setFont(bold, small, regular, $graphite);
        }

        &--draggable {
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
