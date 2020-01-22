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
                <span
                    v-else
                    class="advanced-filter__value"
                    v-text="filterValue" />
                <IconArrowDropDown :state="arrowIconState" />
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
import { ARROW } from '~/defaults/icons';
import { TYPES } from '~/defaults/attributes';
import {
    addElementCopyToDocumentBody,
    removeElementCopyFromDocumentBody,
} from '~/model/layout/ElementCopy';
import { GHOST_ELEMENT_MODEL, DRAGGED_ELEMENT, COLUMN_FILTER_TYPE } from '~/defaults/grid';
import {
    getDraggedColumnPositionState,
    getPositionForBrowser,
    isTrashBelowMouse,
} from '~/model/drag_and_drop/helpers';
import { ADV_FILTERS_IDS } from '~/defaults/grid/cookies';
import { changeCookiePosition } from '~/model/cookies';
import { getMappedColumnHeaderTitle } from '~/model/mappers/gridDataMapper';
import DropDown from '~/core/components/Inputs/Select/Contents/DropDown';

export default {
    name: 'GridAdvancedFilter',
    components: {
        IconArrowDropDown: () => import('~/components/Icon/Arrows/IconArrowDropDown'),
        GridAdvancedFilterGhost: () => import('~/core/components/Grid/AdvancedFilters/GridAdvancedFilterGhost'),
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
    mounted() {
        this.associatedLabel = `input-${this._uid}`;
    },
    destroyed() {
        window.removeEventListener('click', this.onClickOutside);
    },
    computed: {
        ...mapState('draggable', {
            ghostFilterIndex: (state) => state.ghostFilterIndex,
            draggedElementOnGrid: (state) => state.draggedElementOnGrid,
            draggedElement: (state) => state.draggedElement,
        }),
        isFilterExists() {
            return this.draggedElement === this.filter.id;
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
                return () => import('~/core/components/Inputs/Select/Contents/Footers/SelectContentFooter');
            case COLUMN_FILTER_TYPE.MULTI_SELECT:
            case COLUMN_FILTER_TYPE.DATE:
            case COLUMN_FILTER_TYPE.RANGE:
                return () => import('~/core/components/Inputs/Select/Contents/Footers/MultiselectContentFooter');
            default: return () => import('~/core/components/Inputs/Select/Contents/Footers/SelectContentApplyFooter');
            }
        },
        selectBodyComponent() {
            switch (this.filter.type) {
            case COLUMN_FILTER_TYPE.SELECT:
                return () => import('~/core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterSelectContent');
            case COLUMN_FILTER_TYPE.MULTI_SELECT:
                return () => import('~/core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterMultiselectContent');
            case COLUMN_FILTER_TYPE.TEXT:
                return () => import('~/core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterTextContent');
            case COLUMN_FILTER_TYPE.DATE:
                return () => import('~/core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterDateContent');
            case COLUMN_FILTER_TYPE.RANGE:
                return () => import('~/core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterRangeContent');
            default: return () => import('~/core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterTextContent');
            }
        },
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
        cursor: pointer;

        &__activator {
            position: relative;
            display: flex;
        }

        &__input {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
        }

        &__label {
            display: flex;
            align-items: center;
            border: 1px solid $GREY;
            padding: 0 8px;
            box-sizing: border-box;
            background-color: $WHITESMOKE;
            color: $GRAPHITE_DARK;
            font: $FONT_BOLD_12_16;
        }

        &__details {
            display: flex;
            align-items: center;
            padding: 0 2px 0 8px;
            box-sizing: border-box;
            border-right: 1px solid $GREY;
            border-top: 1px solid $GREY;
            border-bottom: 1px solid $GREY;
        }

        &__placeholder {
            color: $GREY_DARK;
        }

        &__value {
            color: $GRAPHITE_DARK;
        }

        &__placeholder, &__value {
            font: $FONT_MEDIUM_12_16;
        }

        &--exists {
            #{$filter}__label {
                background-color: $GREEN;
                box-shadow: $ELEVATOR_HOLE;
                color: $WHITE;
            }
        }

        &--selected {
            #{$filter}__label {
                border-color: $GREEN;
                background-color: $GREEN;
                color: $WHITE;
            }

            #{$filter}__details {
                border-color: $GREEN;
                border-width: 2px;
                padding: 0 1px 0 8px;
            }
        }
    }
</style>
