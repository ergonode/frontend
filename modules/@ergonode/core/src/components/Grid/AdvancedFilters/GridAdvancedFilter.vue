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
        :draggable="!isFocused"
        @dragover="onDragOver"
        @dragstart="onDragStart"
        @dragend="onDragEnd">
        <div
            ref="activator"
            class="advanced-filter__activator"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp">
            <label
                class="advanced-filter__label"
                :for="associatedLabel"
                v-text="title" />
            <input
                :id="associatedLabel"
                ref="input"
                class="advanced-filter__input"
                readonly
                :title="hint"
                @focus="onFocus"
                @blur="onBlur">
            <div class="advanced-filter__details">
                <span
                    v-if="!value"
                    class="advanced-filter__placeholder">
                    Select...
                </span>
                <template v-else>
                    <span
                        class="advanced-filter__value"
                        v-text="value" />
                    <span
                        v-if="parameters"
                        class="advanced-filter__parameter"
                        v-text="parameters" />
                </template>
                <IconArrowDropDown
                    class="advanced-filter__icon"
                    :state="arrowIconState"
                    :fill-color="arrowIconFillColor" />
            </div>
        </div>
        <GridAdvancedFilterDropDown
            v-if="needsToRender"
            ref="menu"
            :offset="offset"
            :is-visible="isFocused"
            @clickOutside="onClickOutside">
            <template #body>
                <slot name="body" />
            </template>
            <template #footer>
                <slot
                    name="footer"
                    :on-apply="onApply" />
            </template>
        </GridAdvancedFilterDropDown>
    </div>
</template>

<script>
import {
    GRAPHITE_DARK,
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import GridAdvancedFilterDropDown from '@Core/components/Grid/AdvancedFilters/DropDown/GridAdvancedFilterDropDown';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    ARROW,
} from '@Core/defaults/icons';
import associatedLabelMixin from '@Core/mixins/inputs/associatedLabelMixin';
import {
    getDraggedColumnPositionState,
    getPositionForBrowser,
    isMouseInsideElement,
} from '@Core/models/drag_and_drop/helpers';
import {
    addElementCopyToDocumentBody,
    removeElementCopyFromDocumentBody,
} from '@Core/models/layout/ElementCopy';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'GridAdvancedFilter',
    components: {
        GridAdvancedFilterDropDown,
        IconArrowDropDown: () => import('@Core/components/Icons/Arrows/IconArrowDropDown'),
    },
    mixins: [
        associatedLabelMixin,
    ],
    props: {
        index: {
            type: Number,
            required: true,
        },
        filterId: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        hint: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        parameters: {
            type: String,
            default: '',
        },
        value: {
            type: [
                String,
                Number,
            ],
            default: '',
        },
    },
    data() {
        return {
            mouseUpTime: 0,
            isFocused: false,
            isClickedOutside: false,
            needsToRender: false,
            offset: {},
        };
    },
    computed: {
        ...mapState('draggable', {
            ghostIndex: state => state.ghostIndex,
            isElementDragging: state => state.isElementDragging,
            draggedElement: state => state.draggedElement,
        }),
        isFilterExists() {
            return this.draggedElement === this.filterId;
        },
        arrowIconFillColor() {
            return this.isFilterExists ? WHITE : GRAPHITE_DARK;
        },
        arrowIconState() {
            return this.isFocused ? ARROW.UP : ARROW.DOWN;
        },
    },
    methods: {
        ...mapActions('draggable', [
            'setDraggableState',
            'setGhostIndex',
            'setDraggedElement',
        ]),
        ...mapActions('list', [
            'setDisabledElement',
        ]),
        getDropDownOffset() {
            const {
                x, y, width, height,
            } = this.$refs.activator.getBoundingClientRect();

            return {
                x,
                y,
                width,
                height,
            };
        },
        onDragStart(event) {
            addElementCopyToDocumentBody({
                event,
                id: this.filterId,
                label: this.title,
            });
            this.setDraggedElement(this.filterId);
            this.setDraggableState({
                propName: 'isElementDragging',
                value: DRAGGED_ELEMENT.FILTER,
            });

            window.requestAnimationFrame(() => {
                this.setGhostIndex(this.index);
            });
        },
        onDragEnd(event) {
            removeElementCopyFromDocumentBody(event);

            const {
                xPos,
                yPos,
            } = getPositionForBrowser(event);
            const trashElement = document.documentElement.querySelector('.drop-zone');
            const isDroppedToTrash = isMouseInsideElement(trashElement, xPos, yPos);

            if (isDroppedToTrash) {
                this.$emit('remove', this.index);
            }

            this.setDraggableState({
                propName: 'isElementDragging',
                value: null,
            });
            this.setDraggedElement();
            this.setGhostIndex();
        },
        onDragOver(event) {
            event.preventDefault();

            const {
                pageX,
            } = event;
            const {
                x: columnXPos, width: columnWidth,
            } = this.$el.getBoundingClientRect();
            const isBefore = getDraggedColumnPositionState(
                pageX,
                columnXPos,
                columnWidth,
            );

            if (this.index === this.ghostIndex
                    || (isBefore && this.ghostIndex === this.index - 1)
                    || (!isBefore && this.ghostIndex === this.index + 1)
                    || this.isElementDragging === DRAGGED_ELEMENT.COLUMN) {
                return false;
            }

            this.$emit('swap', {
                from: this.ghostIndex,
                to: this.index,
            });
            this.setGhostIndex(this.index);

            return true;
        },
        onApply() {
            this.deactivateFilter();
            this.$emit('apply');
        },
        onFocus() {
            if (!this.isFocused && this.mouseUpTime > 0) {
                this.isFocused = true;
                this.offset = this.getDropDownOffset();

                if (!this.needsToRender) {
                    this.needsToRender = true;
                }
            }
        },
        onBlur() {
            if (this.isClickedOutside) {
                this.deactivateFilter();
            }
        },
        deactivateFilter() {
            this.isClickedOutside = false;
            this.isFocused = false;
            this.mouseUpTime = 0;
        },
        onMouseDown(event) {
            const isClickedInsideInput = event.target === this.$refs.input;

            if (!isClickedInsideInput) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
        onMouseUp(event) {
            this.mouseUpTime = new Date().getTime();

            const isDblClicked = event.detail > 1;

            if (isDblClicked) return;

            if (this.isFocused) {
                this.isClickedOutside = true;
                this.onBlur();
            } else {
                this.onFocus();
            }
        },
        onClickOutside({
            event, isClickedOutside,
        }) {
            const isClickedInsideActivator = this.$refs.activator.contains(event.target);

            this.isClickedOutside = isClickedOutside
                    && !isClickedInsideActivator;

            if (this.isClickedOutside) {
                this.onApply();
            }
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

            #{$filter}__label,
            #{$filter}__placeholder,
            #{$filter}__value,
            #{$filter}__parameter {
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
