/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="[
            'header-cell',
            { 'header-cell--exists': isColumnExists }
        ]">
        <GridHeaderCell
            :title="title"
            :hint="hint" />
        <div
            v-show="isActionsVisible"
            class="header-cell__actions">
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
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { SIZE, THEME } from '@Core/defaults/theme';
import { SORTING_ORDER } from '@Core/defaults/icons';
import { GRAPHITE_LIGHT } from '@Core/assets/scss/_js-variables/colors.scss';

export default {
    name: 'GridInteractiveHeaderCell',
    components: {
        ActionIconButton: () => import('@Core/components/Buttons/ActionIconButton'),
        IconArrowSort: () => import('@Core/components/Icons/Arrows/IconArrowSort'),
        IconDots: () => import('@Core/components/Icons/Others/IconDots'),
        GridHeaderCell: () => import('@Core/components/Grid/Layout/Table/Cells/Header/GridHeaderCell'),
    },
    props: {
        label: {
            type: String,
            default: 'Header',
        },
        columnId: {
            type: [String, Number],
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
            draggedElementOnGrid: state => state.draggedElementOnGrid,
            draggedElement: state => state.draggedElement,
        }),
        contextualMenuItems() {
            return ['Remove'];
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
            return this.draggedElement === this.columnId;
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
            const [code, languageCode] = this.columnId.split(':');
            const title = this.label || `#${code}`;
            const languageTitle = languageCode ? languageCode.toUpperCase() : '';

            return `${title} ${languageTitle}`;
        },
        hint() {
            const [code, languageCode] = this.columnId.split(':');

            return this.label ? `${code} ${languageCode}` : null;
        },
    },
    mounted() {
        this.$el.addEventListener('mouseenter', this.onMouseEnter);
        this.$el.addEventListener('mouseleave', this.onMouseLeave);
    },
    beforeDestroy() {
        this.$el.removeEventListener('mouseenter', this.onMouseEnter);
        this.$el.removeEventListener('mouseleave', this.onMouseLeave);
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
            this.$emit('focus', isFocused);
        },
        onSelectOption(option) {
            switch (option) {
            case 'Remove': {
                this.$emit('remove', this.columnIndex);
                this.$emit('focus', false);
                break;
            }
            default: break;
            }
        },
        getColumnAtIndex(index) {
            const gridColumns = document.querySelector('.columns-section');
            const { children } = gridColumns;

            return children[index];
        },
        onMouseEnter() {
            if (this.draggedElementOnGrid || this.isHeaderFocused()) return;
            this.addColumnHover();
        },
        onMouseLeave() {
            if (this.draggedElementOnGrid || this.isHeaderFocused()) return;
            this.removeColumnHover();
        },
        isHeaderFocused() {
            const gridColumns = document.querySelector('.columns-section');
            const headerEls = gridColumns.querySelectorAll('.header-cell__actions--focused');

            return headerEls.length;
        },
        addColumnHover() {
            this.isColumnHovered = true;

            const columnElement = this.getColumnAtIndex(this.columnIndex);

            columnElement.classList.add('draggable-column--hovered');
        },
        removeColumnHover() {
            this.isColumnHovered = false;

            const columnElement = this.getColumnAtIndex(this.columnIndex);

            columnElement.classList.remove('draggable-column--hovered');
        },
    },
};
</script>

<style lang="scss" scoped>
    .header-cell {
        $cell: &;

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

        &__actions {
            display: flex;
            align-items: center;
            cursor: pointer;
        }
    }
</style>
