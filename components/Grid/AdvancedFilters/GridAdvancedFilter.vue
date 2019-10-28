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
                'advanced-filter--error': isError,
            }
        ]"
        :draggable="true"
        @dragover="onDragOver"
        @dragstart="onDragStart"
        @dragend="onDragEnd">
        <div
            ref="activator"
            class="advanced-filter__activator"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp">
            <label
                class="advanced-filter__label font--bold-12-16"
                :for="associatedLabel"
                v-text="data.id" />
            <input
                :id="associatedLabel"
                ref="input"
                class="advanced-filter__input"
                readonly
                @focus="onFocus"
                @blur="onBlur">
            <div class="advanced-filter__details">
                <span
                    v-if="!filterValue"
                    class="advanced-filter__placeholder font--medium-12-16">
                    Select
                </span>
                <span
                    v-else
                    class="advanced-filter__value font--medium-12-16"
                    v-text="filterValue" />
                <IconArrowDropDown :state="arrowIconState" />
            </div>
            <div class="icon-error-container">
                <IconError
                    v-if="isError"
                    size="16" />
            </div>
        </div>
        <SelectBaseContent
            v-if="isMenuActive"
            ref="menu"
            :style="selectBoundingBox"
            :fixed-content="false">
            <template #body>
                <Component
                    :is="selectBodyComponent"
                    :filter="filter || {}"
                    :options="options"
                    @emptyRecord="onEmptyRecordChange"
                    @input="onValueChange" />
            </template>
            <template #footer>
                <Component
                    :is="selectFooterComponent"
                    @apply="onApply"
                    @clear="onClear" />
            </template>
        </SelectBaseContent>
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
import { GHOST_ELEMENT_MODEL, DRAGGED_ELEMENT } from '~/defaults/grid';
import {
    getDraggedColumnPositionState,
} from '~/model/drag_and_drop/helpers';
import SelectBaseContent from '~/components/Inputs/Select/Contents/SelectBaseContent';

export default {
    name: 'GridAdvancedFilter',
    components: {
        IconArrowDropDown: () => import('~/components/Icon/Arrows/IconArrowDropDown'),
        IconError: () => import('~/components/Icon/Feedback/IconError'),
        SelectBaseContent,
    },
    props: {
        isError: {
            type: Boolean,
            default: false,
        },
        index: {
            type: Number,
            required: true,
        },
        data: {
            type: Object,
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
        namespace: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
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
        }),
        filterValue() {
            if (this.filter) {
                if (this.filter.isEmptyRecord) return 'Empty records';

                const value = [];

                Object.keys(this.filter).forEach((key) => {
                    if (this.filter[key]) {
                        value.push(this.filter[key]);
                    }
                });

                return value.join(' - ');
            }

            return null;
        },
        options() {
            const { filter } = this.data;
            if (!filter || !filter.options) return null;

            const { options } = filter;
            const optionKeys = Object.keys(options);

            return optionKeys.map((key) => ({ key, value: options[key] }));
        },
        arrowIconState() {
            return this.isFocused ? ARROW.UP : ARROW.DOWN;
        },
        selectFooterComponent() {
            switch (this.data.type) {
            case TYPES.SELECT:
                return () => import('~/components/Inputs/Select/Contents/Footers/SelectContentFooter');
            case TYPES.MULTI_SELECT:
            case TYPES.DATE:
            case TYPES.PRICE:
                return () => import('~/components/Inputs/Select/Contents/Footers/MultiselectContentFooter');
            default: return () => import('~/components/Inputs/Select/Contents/Footers/SelectContentApplyFooter');
            }
        },
        selectBodyComponent() {
            switch (this.data.type) {
            case TYPES.SELECT:
                return () => import('~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterSelectContent');
            case TYPES.MULTI_SELECT:
                return () => import('~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterMultiselectContent');
            case TYPES.TEXT:
                return () => import('~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterTextContent');
            case TYPES.DATE:
                return () => import('~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterDateContent');
            case TYPES.PRICE:
            case TYPES.NUMERIC:
                return () => import('~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterRangeContent');
            default: return () => import('~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterTextContent');
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

            addElementCopyToDocumentBody(event, width, JSON.stringify(this.data));
            this.setDraggableState({ propName: 'draggedElementOnGrid', value: DRAGGED_ELEMENT.FILTER });

            window.requestAnimationFrame(() => {
                this.$store.dispatch(`${this.namespace}/setAdvancedFilterAtIndex`, {
                    index: this.index,
                    filter: GHOST_ELEMENT_MODEL,
                });
                this.setGhostFilterIndex(this.index);
            });
        },
        onDragEnd(event) {
            const { pageX, pageY } = event;
            const elementBelowMouse = document.elementFromPoint(pageX, pageY);
            const isTrashBelowMouse = elementBelowMouse && elementBelowMouse.className === 'trash-can';

            if (isTrashBelowMouse) {
                const { language, element_id: elementId } = this.data;

                this.$store.dispatch(`${this.namespace}/removeAdvancedFilterAtIndex`, this.index);
                this.setDisabledElement({
                    languageCode: language, elementId, disabled: false,
                });
            } else {
                this.$store.dispatch(`${this.namespace}/setAdvancedFilterAtIndex`, {
                    index: this.ghostFilterIndex,
                    filter: this.data,
                });
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

            if ((isBefore && this.ghostFilterIndex === this.index - 1)
                || (!isBefore && this.ghostFilterIndex === this.index + 1)
                || this.draggedElementOnGrid === DRAGGED_ELEMENT.COLUMN) {
                return false;
            }

            if (this.ghostFilterIndex === -1) {
                const ghostFilterIndex = isBefore ? this.index : this.index + 1;

                this.setGhostFilterIndex(ghostFilterIndex);
                this.$store.dispatch(`${this.namespace}/insertAdvancedFilterAtIndex`, { index: ghostFilterIndex, filter: GHOST_ELEMENT_MODEL });
            } else {
                this.$store.dispatch(`${this.namespace}/changeFiltersPosition`, {
                    from: this.ghostFilterIndex,
                    to: this.index,
                });
                this.setGhostFilterIndex(this.index);
            }

            return true;
        },
        onEmptyRecordChange(isEmptyRecord) {
            this.$store.dispatch(`${this.namespace}/setAdvancedFilterEmptyRecord`, { id: this.data.id, isEmptyRecord });
        },
        onValueChange({ value, operator }) {
            this.$store.dispatch(`${this.namespace}/setAdvancedFilterValue`, { id: this.data.id, operator, value });

            if (this.data.type === TYPES.SELECT) {
                this.onApply();
            }
        },
        onClear() {
            this.$store.dispatch(`${this.namespace}/removeAdvancedFilter`, this.data.id);
            this.$store.dispatch(`${this.namespace}/getData`, { path: this.path });
            this.$store.dispatch(`${this.namespace}/setCurrentPage`, 1);
        },
        onApply() {
            window.removeEventListener('click', this.onClickOutside);

            this.deactivateFilter();

            this.$store.dispatch(`${this.namespace}/getData`, { path: this.path });
            this.$store.dispatch(`${this.namespace}/setCurrentPage`, 1);
        },
        onFocus() {
            if (!this.isFocused) {
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

            window.removeEventListener('click', this.onClickOutside);
            this.$emit('focus', false);
        },
        onMouseMove() {
            // Dismiss drop down menu when we detect any move of mouse
            this.deactivateFilter();
        },
        onMouseDown(event) {
            this.$refs.activator.addEventListener('mousemove', this.onMouseMove);

            const isClickedInsideInput = event.target === this.$refs.input;

            if (!isClickedInsideInput) {
                event.preventDefault();
                event.stopPropagation();
            }

            this.hasMouseDown = true;
        },
        onMouseUp(event) {
            this.$refs.activator.removeEventListener('mousemove', this.onMouseMove);

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

                this.$store.dispatch(`${this.namespace}/getData`, { path: this.path });
                this.$store.dispatch(`${this.namespace}/setCurrentPage`, 1);
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

        &--error {
            #{$filter}__details {
                background-color: $RED_LIGHT;
            }
        }
    }

    .icon-error-container {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 16px;
        height: 16px;
    }
</style>
