/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['header-cell', {
            'header-cell--exists': isColumnExists,
            'header-cell--draggable': isColumnEditable && !isCellEditing,
        }
        ]">
        <GridPresentationHeaderCell
            :title="column.header.title"
            :hint="column.header.hint"
            :suffix="column.header.suffix" />
        <div
            :class="[
                'header-cell__actions',
                {
                    'header-cell__actions--sorted': isSorted,
                    'header-cell__actions--focused': isMenuSelected,
                    'header-cell__actions--hovered': isColumnHovered,
                }
            ]">
            <IconArrowSort
                :sorting-order="sortingOrder"
                :fill-color="graphiteLightColor"
                @click.native="onClickSort" />
            <MenuButton
                v-if="isColumnEditable"
                :theme="secondaryTheme"
                :size="tinySize"
                :plain="true"
                @focus="onSelectFocus">
                <template #icon="{ fillColor }">
                    <IconDots :fill-color="fillColor" />
                </template>
                <template #content>
                    <List>
                        <ListElement
                            v-for="option in contextualMenuItems"
                            :key="option.text"
                            :small="true"
                            @click.native="onSelectOption(option)">
                            <ListElementDescription>
                                <ListElementTitle
                                    :small="true"
                                    :title="option.text" />
                            </ListElementDescription>
                            <CheckBox
                                v-if="option.text !== 'Remove'"
                                ref="checkbox"
                                :value="option.value" />
                        </ListElement>
                    </List>
                </template>
            </MenuButton>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { SIZES, THEMES } from '@Core/defaults/buttons';
import { removeCookieById } from '@Core/models/cookies';
import { COLUMNS_IDS } from '@Core/defaults/grid/cookies';
import { SORTING_ORDER } from '@Core/defaults/icons';
import { GRAPHITE_LIGHT } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'GridPresentationInteractiveHeaderCell',
    components: {
        MenuButton: () => import('@Core/components/Buttons/MenuButton'),
        IconArrowSort: () => import('@Core/components/Icons/Arrows/IconArrowSort'),
        IconDots: () => import('@Core/components/Icons/Others/IconDots'),
        List: () => import('@Core/components/List/List'),
        ListElement: () => import('@Core/components/List/ListElement'),
        ListElementDescription: () => import('@Core/components/List/ListElementDescription'),
        ListElementTitle: () => import('@Core/components/List/ListElementTitle'),
        CheckBox: () => import('@Core/components/Inputs/CheckBox'),
        GridPresentationHeaderCell: () => import('@Core/components/Grid/PresentationCells/GridPresentationHeaderCell'),
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
            default: false,
        },
    },
    data() {
        return {
            contextualMenuItems: [
                { text: 'Remove' },
            ],
            isMenuSelected: false,
            isColumnHovered: false,
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
            draggedElement: (state) => state.draggedElement,
        }),
        tinySize() {
            return SIZES.TINY;
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
        isColumnExists() {
            return this.draggedElement === this.column.id;
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
    methods: {
        ...mapActions('list', [
            'setDisabledElement',
        ]),
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
            if (!isFocused) {
                this.removeColumnHover();
            }

            this.isMenuSelected = isFocused;
            this.$emit('focus', isFocused);
        },
        onSelectOption(option) {
            switch (option.text) {
            case 'Remove': {
                if (this.column.element_id) {
                    this.setDisabledElement({
                        languageCode: this.column.language,
                        elementId: this.column.element_id,
                        disabled: false,
                    });
                }

                this.$store.dispatch(`${this.namespace}/removeColumnAtIndex`, this.columnIndex - 1);
                this.$store.dispatch(`${this.namespace}/removeColumnWidthAtIndex`, this.columnIndex - 1);
                removeCookieById({
                    cookies: this.$cookies,
                    cookieName: COLUMNS_IDS,
                    id: this.column.id,
                });
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
            if (this.draggedElementOnGrid || this.isHeaderFocused() || this.isCellEditing) return;
            this.addColumnHover();
        },
        onMouseLeave() {
            if (this.draggedElementOnGrid || this.isHeaderFocused() || this.isCellEditing) return;
            this.removeColumnHover();
        },
        isHeaderFocused() {
            const contentGrid = document.querySelector('.grid__content');
            const headerEls = contentGrid.querySelectorAll('.header-cell__actions--focused');

            return headerEls.length;
        },
        addColumnHover() {
            this.isColumnHovered = true;

            const columnElement = this.getColumnAtIndex(this.columnIndex);

            columnElement.classList.add('column--hovered');
        },
        removeColumnHover() {
            this.isColumnHovered = false;

            const columnElement = this.getColumnAtIndex(this.columnIndex);

            columnElement.classList.remove('column--hovered');
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
        width: 0;
        height: 100%;
        user-select: none;
        pointer-events: auto;

        &--exists {
            background-color: $GREEN;
            box-shadow: $ELEVATOR_HOLE;

            span {
                color: $WHITE;
            }
        }

        &--draggable {
            cursor: grab;
        }

        &__actions {
            display: flex;
            align-items: center;
            opacity: 0;
            cursor: pointer;

            &--focused, &--sorted, &--hovered {
                opacity: 1;
            }
        }
    }
</style>
