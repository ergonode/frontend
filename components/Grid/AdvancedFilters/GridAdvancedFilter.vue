/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="[
            'advanced-filter',
            {
                'advanced-filter--selected': isSelected,
                'advanced-filter--error': isError,
            }
        ]"
        :draggable="!isSelected"
        @dragover="onDragOver"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @click="onClick">
        <span
            class="advanced-filter__label"
            v-text="filter.id" />
        <div class="advanced-filter__details">
            <span
                v-if="!filter.value"
                class="advanced-filter__placeholder">
                Select
            </span>
            <span
                v-else
                class="advanced-filter__value"
                v-text="filter.value" />
            <IconArrowDropDown :state="arrowIconState" />
        </div>
        <div class="icon-error-container">
            <IconError
                v-if="isError"
                size="16" />
        </div>
        <SelectBaseContent
            v-if="isSelected"
            ref="selectContent"
            :style="selectContentPositionStyle"
            :fixed-content="false">
            <template #body>
                <Component
                    :is="selectBodyComponent"
                    :value="filterValue"
                    :options="filter.parameters.options"
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
import { Arrow } from '~/model/icons/Arrow';
import { AttributeTypes } from '~/defaults/attributes/main';
import {
    addElementCopyToDocumentBody,
    removeElementCopyFromDocumentBody,
} from '~/model/layout/ElementCopy';
import { GHOST_ELEMENT_MODEL, DRAGGED_ELEMENT } from '~/defaults/grid/main';
import {
    getDraggedColumnPositionState,
} from '~/model/drag_and_drop/helpers';

export default {
    name: 'GridAdvancedFilter',
    components: {
        IconArrowDropDown: () => import('~/components/Icon/Arrows/IconArrowDropDown'),
        IconError: () => import('~/components/Icon/Feedback/IconError'),
        SelectBaseContent: () => import('~/components/Inputs/Select/Contents/SelectBaseContent'),
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
        filter: {
            type: Object,
            required: true,
        },
        isMouseOverFilters: {
            type: Boolean,
            default: false,
        },
        namespace: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isSelected: false,
            selectContentPositionStyle: null,
            filterValue: this.filter.value,
        };
    },
    destroyed() {
        window.removeEventListener('click', this.onClickOutside);
    },
    computed: {
        ...mapState('draggable', {
            ghostFilterIndex: (state) => state.ghostFilterIndex,
        }),
        arrowIconState() {
            return this.isSelected ? Arrow.UP : Arrow.DOWN;
        },
        selectFooterComponent() {
            switch (this.filter.type) {
            case AttributeTypes.SELECT:
                return () => import('~/components/Inputs/Select/Contents/Footers/SelectContentFooter');
            case AttributeTypes.MULTI_SELECT:
            case AttributeTypes.DATE:
            case AttributeTypes.PRICE:
                return () => import('~/components/Inputs/Select/Contents/Footers/MultiselectContentFooter');
            default: return () => import('~/components/Inputs/Select/Contents/Footers/SelectContentApplyFooter');
            }
        },
        selectBodyComponent() {
            switch (this.filter.type) {
            case AttributeTypes.SELECT:
                return () => import('~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterSelectContent');
            case AttributeTypes.MULTI_SELECT:
                return () => import('~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterMultiselectContent');
            case AttributeTypes.TEXT:
                return () => import('~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterTextContent');
            case AttributeTypes.DATE:
                return () => import('~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterDateContent');
            case AttributeTypes.PRICE:
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
        onDragStart(event) {
            const { width } = this.$el.getBoundingClientRect();

            addElementCopyToDocumentBody(event, width, JSON.stringify(this.filter));
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
                this.$store.dispatch(`${this.namespace}/removeAdvancedFilterAtIndex`, this.index);
            } else {
                this.$store.dispatch(`${this.namespace}/setAdvancedFilterAtIndex`, {
                    index: this.ghostFilterIndex,
                    filter: this.filter,
                });
            }

            removeElementCopyFromDocumentBody(event);
            this.setDraggableState({ propName: 'draggedElementOnGrid', value: null });
        },
        onDragOver(event) {
            if (!this.isMouseOverFilters) this.$emit('mouseOverFilters', true);

            event.preventDefault();

            const { clientX } = event;
            const {
                x: columnXPos, width: columnWidth,
            } = this.$el.getBoundingClientRect();
            const isBefore = getDraggedColumnPositionState(
                clientX,
                columnXPos,
                columnWidth,
            );

            if ((isBefore && this.ghostFilterIndex === this.index - 1)
                || (!isBefore && this.ghostFilterIndex === this.index + 1)) {
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
        onValueChange(value) {
            this.filterValue = value;
        },
        onClear() {
            this.filterValue = '';
        },
        onApply() {
            window.removeEventListener('click', this.onClickOutside);
            this.isSelected = false;

            this.$store.dispatch(`${this.namespace}/setAdvancedFilterValueAtIndex`, { index: this.index, value: this.filterValue });
        },
        onClick() {
            if (!this.isSelected) {
                window.addEventListener('click', this.onClickOutside);
            }
        },
        onClickOutside(event) {
            if (this.isSelected) {
                const { clientX, clientY } = event;
                const {
                    top, left, width, height,
                } = this.$refs.selectContent.$el.getBoundingClientRect();
                const isClickedInsideSelectContent = clientX > left
                    && clientX < left + width
                    && clientY > top
                    && clientY < top + height;

                if (!isClickedInsideSelectContent) {
                    this.isSelected = false;
                }
            } else {
                this.isSelected = !this.isSelected;
            }

            if (this.isSelected) {
                this.selectContentPositionStyle = this.getSelectBoundingBox();
            }

            if (!this.isSelected) {
                window.removeEventListener('click', this.onClickOutside);
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

            if (this.fixedSelectContent) {
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
        outline: none;

        &__label {
            @include setFont(bold, small, regular, $darkGraphite);

            display: flex;
            align-items: center;
            border: 1px solid $grey;
            padding: 0 8px;
            box-sizing: border-box;
            background-color: $background;
        }

        &__details {
            display: flex;
            align-items: center;
            padding: 0 2px 0 8px;
            box-sizing: border-box;
            border-right: 1px solid $grey;
            border-top: 1px solid $grey;
            border-bottom: 1px solid $grey;
        }

        &__placeholder {
            @include setFont(bold, small, regular, $lightGraphite);
        }

        &__value {
            @include setFont(medium, small, regular, $darkGraphite);
        }

        &--selected {
            #{$filter}__label {
                border-color: $primary;
                background-color: $primary;
                color: $white;
            }
        }

        &--error {
            #{$filter}__details {
                background-color: $lightRed;
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
