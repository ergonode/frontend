/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        :locked="true">
        <div
            :class="classes"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave">
            <GridTitleHeaderCell
                :title="title"
                :hint="hint" />
            <div
                v-show="isActionsVisible"
                :class="headerActionsClasses">
                <IconArrowSort
                    :order="sortingOrder"
                    :fill-color="graphiteLightColor"
                    @click.native="onClickSort" />
                <ActionIconButton
                    v-if="deletable"
                    :theme="secondaryPlainTheme"
                    :size="tinySize"
                    :options="contextualMenuItems"
                    @focus="onSelectFocus"
                    @input="onSelectOption">
                    <template #icon="{ color }">
                        <IconDots :fill-color="color" />
                    </template>
                </ActionIconButton>
            </div>
        </div>
    </GridTableCell>
</template>

<script>
import {
    GRAPHITE_LIGHT,
} from '@Core/assets/scss/_js-variables/colors.scss';
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import {
    SORTING_ORDER,
} from '@Core/defaults/icons';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    isObject,
} from '@Core/models/objectWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'GridHeaderCell',
    components: {
        GridTableCell,
        ActionIconButton: () => import('@Core/components/Buttons/ActionIconButton'),
        IconArrowSort: () => import('@Core/components/Icons/Arrows/IconArrowSort'),
        IconDots: () => import('@Core/components/Icons/Others/IconDots'),
        GridTitleHeaderCell: () => import('@Core/components/Grid/Layout/Table/Cells/Header/GridTitleHeaderCell'),
    },
    props: {
        label: {
            type: String,
            default: 'Header',
        },
        columnId: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        sortedColumn: {
            type: Object,
            required: true,
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        rowIndex: {
            type: Number,
            required: true,
        },
        deletable: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isMenuSelected: false,
            isColumnHovered: false,
        };
    },
    computed: {
        ...mapState('draggable', {
            isElementDragging: state => state.isElementDragging,
            draggedElement: state => state.draggedElement,
        }),
        headerCellComponent() {
            const extendedComponents = this.$getExtendedComponents('@Core/Components/Grid/Layout/Table/Cells/Header');

            if (!(extendedComponents && extendedComponents[this.type])) {
                return null;
            }

            return extendedComponents[this.type];
        },
        classes() {
            return [
                'grid-header-cell',
                {
                    'grid-header-cell--exists': this.isColumnExists,
                },
            ];
        },
        headerActionsClasses() {
            return [
                'grid-header-cell-actions',
                {
                    'grid-header-cell-actions--focused': this.isMenuSelected,
                },
            ];
        },
        contextualMenuItems() {
            return [
                'Remove',
            ];
        },
        tinySize() {
            return SIZE.TINY;
        },
        secondaryPlainTheme() {
            return THEME.SECONDARY_PLAIN;
        },
        graphiteLightColor() {
            return GRAPHITE_LIGHT;
        },
        isColumnExists() {
            return (isObject(this.draggedElement) && this.draggedElement.id === this.columnId)
                || this.draggedElement === this.columnId;
        },
        isSorted() {
            return this.sortedColumn.index === this.columnId;
        },
        sortingOrder() {
            if (!this.isSorted) return null;

            return this.sortedColumn.orderState;
        },
        isActionsVisible() {
            return !this.isColumnExists
                && (this.isSorted
                    || this.isMenuSelected
                    || this.isColumnHovered);
        },
        title() {
            const [
                code,
                languageCode,
            ] = this.columnId.split(':');
            const title = this.label || `#${code}`;
            const languageTitle = languageCode ? languageCode.toUpperCase() : '';

            return `${title} ${languageTitle}`;
        },
        hint() {
            const [
                code,
                languageCode,
            ] = this.columnId.split(':');

            return this.label ? `${code} ${languageCode}` : null;
        },
    },
    methods: {
        ...mapActions('list', [
            'setDisabledElement',
        ]),
        onClickSort() {
            let orderState = SORTING_ORDER.ASC;
            if (this.isSorted) {
                if (this.sortedColumn.orderState === SORTING_ORDER.ASC) {
                    orderState = SORTING_ORDER.DESC;
                }
                if (this.sortedColumn.orderState === SORTING_ORDER.DESC) {
                    orderState = SORTING_ORDER.ASC;
                }
            }

            this.$emit('sort', {
                index: this.columnId,
                orderState,
            });
        },
        onSelectFocus(isFocused) {
            if (!isFocused) {
                this.removeColumnHover();
            }

            this.isMenuSelected = isFocused;
        },
        onSelectOption(option) {
            switch (option) {
            case 'Remove': {
                this.$emit('remove', this.columnIndex);
                break;
            }
            default: break;
            }
        },
        getColumnAtIndex(index) {
            const gridColumns = document.querySelector('.grid-table-layout-columns-section');
            const {
                children,
            } = gridColumns;

            return children[index];
        },
        onMouseEnter() {
            if (this.isElementDragging || this.isHeaderFocused()) return;
            this.addColumnHover();
        },
        onMouseLeave() {
            if (this.isElementDragging || this.isHeaderFocused()) return;
            this.removeColumnHover();
        },
        isHeaderFocused() {
            const gridColumns = document.querySelector('.grid-table-layout-columns-section');
            const headerEls = gridColumns.querySelectorAll('.grid-header-cell-actions--focused');

            return headerEls.length;
        },
        addColumnHover() {
            this.isColumnHovered = true;

            const columnElement = this.getColumnAtIndex(this.columnIndex);

            columnElement.classList.add('grid-column--hovered');
        },
        removeColumnHover() {
            this.isColumnHovered = false;

            const columnElement = this.getColumnAtIndex(this.columnIndex);

            columnElement.classList.remove('grid-column--hovered');
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-header-cell {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        user-select: none;
        pointer-events: auto;
        cursor: grab;

        &--exists {
            background-color: $GREEN;
            box-shadow: $ELEVATOR_HOLE;

            span {
                color: $WHITE;
            }
        }
    }

    .grid-header-cell-actions {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
</style>
