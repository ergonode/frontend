/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="[
            'advanced-filter',
            {
                'advanced-filter--selected': isFocused,
                'advanced-filter--exists': isFilterExists,
            }
        ]"
        :draggable="!isMenuActive"
        @dragover="onDragOver"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @drop="onDrop">
        <GridAdvancedFilterGhost
            v-if="filter.isGhost"
            :is-mouse-over-filters="isMouseOverFilters" />
        <div
            v-else
            ref="activator"
            class="advanced-filter__activator"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp">
            <label
                class="advanced-filter__label"
                :for="associatedLabel"
                v-text="filterHeader.title" />
            <input
                :id="associatedLabel"
                ref="input"
                class="advanced-filter__input"
                readonly
                :title="filterHeader.hint"
                @focus="onFocus"
                @blur="onBlur">
            <div class="advanced-filter__details">
                <span
                    v-if="!filterValue"
                    class="advanced-filter__placeholder">
                    Select...
                </span>
                <template v-else>
                    <span
                        class="advanced-filter__value"
                        v-text="filterValue" />
                    <span
                        v-if="parameter"
                        class="advanced-filter__parameter"
                        v-text="parameter" />
                </template>
                <IconArrowDropDown
                    class="advanced-filter__icon"
                    :state="arrowIconState"
                    :fill-color="arrowIconFillColor" />
            </div>
        </div>
        <DropDown
            v-if="isMenuActive"
            ref="menu"
            :style="selectBoundingBox"
            :fixed-content="isSelectKind">
            <template #body>
                <Component
                    :is="selectBodyComponent"
                    :filter="filter"
                    :value="filter.value"
                    :options="filter.options"
                    :language-code="filter.languageCode"
                    @emptyRecord="onEmptyRecordChange"
                    @input="onValueChange" />
            </template>
            <template #footer>
                <Component
                    :is="selectFooterComponent"
                    @apply="onApply"
                    @clear="onClear" />
            </template>
        </DropDown>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { ARROW } from '@Core/defaults/icons';
import { TYPES } from '@Attributes/defaults/attributes';
import { WHITE, GRAPHITE_DARK } from '@Core/assets/scss/_js-variables/colors.scss';
import {
    addElementCopyToDocumentBody,
    removeElementCopyFromDocumentBody,
} from '@Core/models/layout/ElementCopy';
import { GHOST_ELEMENT_MODEL, DRAGGED_ELEMENT, COLUMN_FILTER_TYPE } from '@Core/defaults/grid';
import {
    getDraggedColumnPositionState,
    getPositionForBrowser,
    isTrashBelowMouse,
} from '@Core/models/drag_and_drop/helpers';
import { ADV_FILTERS_IDS } from '@Core/defaults/grid/cookies';
import { changeCookiePosition, removeCookieById } from '@Core/models/cookies';
import { getMappedColumnHeaderTitle } from '@Core/models/mappers/gridDataMapper';
import DropDown from '@Core/components/Inputs/Select/Contents/DropDown';

export default {
    name: 'GridAdvancedFilter',
    components: {
        IconArrowDropDown: () => import('@Core/components/Icons/Arrows/IconArrowDropDown'),
        GridAdvancedFilterGhost: () => import('@Core/components/Grid/AdvancedFilters/GridAdvancedFilterGhost'),
        DropDown,
    },
    props: {
        index: {
            type: Number,
            required: true,
        },
        filter: {
            type: Object,
            default: null,
        },
        isMouseOverFilters: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            mouseUpTime: 0,
            isFocused: false,
            isMenuActive: false,
            isClickedOutside: false,
            hasMouseDown: false,
            selectBoundingBox: null,
            associatedLabel: '',
        };
    },
    computed: {
        ...mapState('draggable', {
            ghostFilterIndex: state => state.ghostFilterIndex,
            draggedElementOnGrid: state => state.draggedElementOnGrid,
            draggedElement: state => state.draggedElement,
        }),
        parameter() {
            if (!this.filter.parameters) return null;

            const [key] = Object.keys(this.filter.parameters);

            return this.filter.parameters[key];
        },
        isFilterExists() {
            return this.draggedElement === this.filter.id;
        },
        arrowIconFillColor() {
            return this.isFilterExists ? WHITE : GRAPHITE_DARK;
        },
        filterHeader() {
            return getMappedColumnHeaderTitle(this.filter);
        },
        filterValue() {
            if (this.filter.value.isEmptyRecord) return 'Empty records';

            const value = [];

            Object.keys(this.filter.value).forEach((key) => {
                if (this.filter.value[key]) {
                    value.push(this.filter.value[key]);
                }
            });

            return value.join(' - ');
        },
        arrowIconState() {
            return this.isFocused ? ARROW.UP : ARROW.DOWN;
        },
        isSelectKind() {
            return this.filter.type === COLUMN_FILTER_TYPE.SELECT
                || this.filter.type === COLUMN_FILTER_TYPE.MULTI_SELECT;
        },
        selectFooterComponent() {
            switch (this.filter.type) {
            case COLUMN_FILTER_TYPE.SELECT:
                return () => import('@Core/components/Inputs/Select/Contents/Footers/SelectContentFooter');
            case COLUMN_FILTER_TYPE.MULTI_SELECT:
            case COLUMN_FILTER_TYPE.DATE:
            case COLUMN_FILTER_TYPE.RANGE:
                return () => import('@Core/components/Inputs/Select/Contents/Footers/MultiselectContentFooter');
            default: return () => import('@Core/components/Inputs/Select/Contents/Footers/SelectContentApplyFooter');
            }
        },
        selectBodyComponent() {
            switch (this.filter.type) {
            case COLUMN_FILTER_TYPE.SELECT:
                return () => import('@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterSelectContent');
            case COLUMN_FILTER_TYPE.MULTI_SELECT:
                return () => import('@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterMultiselectContent');
            case COLUMN_FILTER_TYPE.TEXT:
                return () => import('@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterTextContent');
            case COLUMN_FILTER_TYPE.DATE:
                return () => import('@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterDateContent');
            case COLUMN_FILTER_TYPE.RANGE:
                return () => import('@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterRangeContent');
            default: return () => import('@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterTextContent');
            }
        },
    },
    mounted() {
        this.associatedLabel = `input-${this._uid}`;
    },
    destroyed() {
        window.removeEventListener('click', this.onClickOutside);
    },
    methods: {
        ...mapActions('draggable', [
            'setDraggableState',
            'setGhostFilterIndex',
        ]),
        ...mapActions('list', [
            'setDisabledElement',
        ]),
        onDragStart(event) {
            const { width } = this.$el.getBoundingClientRect();

            addElementCopyToDocumentBody(event, width, JSON.stringify(this.filter));
            this.setDraggableState({ propName: 'draggedElementOnGrid', value: DRAGGED_ELEMENT.FILTER });

            window.requestAnimationFrame(() => {
                this.$emit('setGhost', { index: this.index, isGhost: true });
                this.setGhostFilterIndex(this.index);
            });
        },
        onDrop(event) {
            event.preventDefault();

            const data = event.dataTransfer.getData('text/plain');

            this.$emit('drop', {
                index: this.ghostFilterIndex,
                data,
            });
        },
        onDragEnd(event) {
            const { xPos, yPos } = getPositionForBrowser(event);

            if (isTrashBelowMouse(xPos, yPos)) {
                const { id, attributeId } = this.filter;
                const [, languageCode] = id.split(':');

                this.$emit('remove', this.index);
                this.setDisabledElement({
                    languageCode, elementId: attributeId, disabled: false,
                });

                removeCookieById({
                    cookies: this.$cookies,
                    cookieName: ADV_FILTERS_IDS,
                    id: this.filter.id,
                });
            } else {
                changeCookiePosition({
                    cookies: this.$cookies,
                    cookieName: ADV_FILTERS_IDS,
                    from: this.index,
                    to: this.ghostFilterIndex,
                });
                this.$emit('setGhost', { index: this.index, isGhost: false });
            }

            removeElementCopyFromDocumentBody(event);
            this.setDraggableState({ propName: 'draggedElementOnGrid', value: null });
        },
        onDragOver(event) {
            if (!this.isMouseOverFilters) this.$emit('mouseOverFilters', true);

            event.preventDefault();

            const { pageX } = event;
            const {
                x: columnXPos, width: columnWidth,
            } = this.$el.getBoundingClientRect();
            const isBefore = getDraggedColumnPositionState(
                pageX,
                columnXPos,
                columnWidth,
            );

            if (this.index === this.ghostFilterIndex
                || (isBefore && this.ghostFilterIndex === this.index - 1)
                || (!isBefore && this.ghostFilterIndex === this.index + 1)
                || this.draggedElementOnGrid === DRAGGED_ELEMENT.COLUMN) {
                return false;
            }

            if (this.ghostFilterIndex === -1) {
                const ghostFilterIndex = isBefore ? this.index : this.index + 1;

                this.setGhostFilterIndex(ghostFilterIndex);
                this.$emit('insert', { index: ghostFilterIndex, filter: GHOST_ELEMENT_MODEL });
            } else {
                this.$emit('swap', {
                    from: this.ghostFilterIndex,
                    to: this.index,
                });
                this.setGhostFilterIndex(this.index);
            }

            return true;
        },
        onEmptyRecordChange(isEmptyRecord) {
            this.$emit('update', {
                index: this.index,
                key: 'isEmptyRecord',
                value: isEmptyRecord,
            });
        },
        onValueChange({ value, operator }) {
            if (value.length) {
                this.$emit('update', {
                    index: this.index,
                    key: operator,
                    value,
                });
            } else {
                this.$emit('clear', this.index);
            }

            if (this.filter.type === TYPES.SELECT) {
                this.onApply();
            }
        },
        onClear() {
            this.$emit('clear', this.index);
        },
        onApply() {
            window.removeEventListener('click', this.onClickOutside);

            this.deactivateFilter();
            this.$emit('apply');
        },
        onFocus() {
            if (!this.isFocused && this.mouseUpTime > 0) {
                this.isFocused = true;
                this.isMenuActive = true;
                this.hasMouseDown = false;
                this.selectBoundingBox = this.getSelectBoundingBox();

                window.addEventListener('click', this.onClickOutside);
                this.$emit('focus', true);
            }
        },
        onBlur() {
            if (this.isClickedOutside) {
                this.deactivateFilter();
            }
        },
        deactivateFilter() {
            this.isFocused = false;
            this.isMenuActive = false;
            this.mouseUpTime = 0;

            window.removeEventListener('click', this.onClickOutside);
            this.$emit('focus', false);
        },
        onMouseDown(event) {
            const isClickedInsideInput = event.target === this.$refs.input;

            if (!isClickedInsideInput) {
                event.preventDefault();
                event.stopPropagation();
            }

            this.hasMouseDown = true;
        },
        onMouseUp(event) {
            this.mouseUpTime = new Date().getTime();

            const isDblClicked = event.detail > 1;

            if (isDblClicked) return;

            if (this.isFocused && this.hasMouseDown) {
                this.isClickedOutside = true;
                this.onBlur();
            } else {
                this.onFocus();
            }

            this.hasMouseDown = false;
        },
        onClickOutside(event) {
            const isClickedInsideMenu = this.$refs.menu.$el.contains(event.target);
            const isClickedInsideActivator = this.$refs.activator.contains(event.target);

            this.isClickedOutside = !isClickedInsideMenu
                && !isClickedInsideActivator;

            if (this.isClickedOutside) {
                this.deactivateFilter();
                this.$emit('apply');
            }
        },
        getSelectBoundingBox() {
            const {
                x,
                y,
                height,
                width,
            } = this.$el.getBoundingClientRect();
            const { innerHeight } = window;
            const maxHeight = 200;

            const position = { left: `${x}px` };

            if (this.fixedContentWidth) {
                position.width = `${width}px`;
            }

            if (innerHeight - y < maxHeight) {
                const offsetBottom = innerHeight - y;

                position.bottom = `${offsetBottom + 1}px`;

                return position;
            }

            position.top = `${y + height + 2}px`;

            return position;
        },
    },
};
</script>

<style lang="scss" scoped>
    .advanced-filter {
        $filter: &;

        position: relative;
        display: flex;
        height: 32px;
        box-sizing: border-box;
        background-color: $WHITESMOKE;
        cursor: pointer;
        max-width: 200px;
        overflow: hidden;

        &__activator {
            position: relative;
            display: flex;
            overflow: hidden;
        }

        &__input {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
        }

        &__label {
            display: flex;
            flex-shrink: 0;
            align-items: center;
            padding: 0 8px;
            box-sizing: border-box;
            color: $GRAPHITE_DARK;
            font: $FONT_BOLD_12_16;
        }

        &__details {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding-right: 4px;
            font: $FONT_MEDIUM_12_16;
            overflow: hidden;
        }

        &__label, &__value {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        &__placeholder {
            color: $GREY_DARK;
        }

        &__value, &__parameter {
            color: $GRAPHITE_DARK;
        }

        &__parameter {
            margin-left: 4px;
        }

        &__icon {
            flex-shrink: 0;
        }

        &--exists {
            background-color: $GREEN;
            box-shadow: $ELEVATOR_HOLE;

            #{$filter}__label, #{$filter}__placeholder {
                color: $WHITE;
            }
        }

        &--selected {
            border: $BORDER_2_GREEN;
            background-color: $WHITE;

            #{$filter}__label {
                padding-left: 6px;
            }

            #{$filter}__details {
                padding-right: 2px;
            }
        }
    }
</style>
