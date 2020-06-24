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
                    v-if="!filterValue"
                    class="advanced-filter__placeholder">
                    Select...
                </span>
                <template v-else>
                    <span
                        class="advanced-filter__value"
                        v-text="filterValue" />
                    <span
                        v-if="filter.parameters"
                        class="advanced-filter__parameter"
                        v-text="filter.parameters" />
                </template>
                <IconArrowDropDown
                    class="advanced-filter__icon"
                    :state="arrowIconState"
                    :fill-color="arrowIconFillColor" />
            </div>
        </div>
        <AdvancedFilterDropDown
            v-if="needsToRender"
            ref="menu"
            :offset="offset"
            :filter="filter"
            :is-visible="isFocused"
            @input="onValueChange"
            @clear="onClear"
            @apply="onApply"
            @clickOutside="onClickOutside" />
    </div>
</template>

<script>
import {
    TYPES,
} from '@Attributes/defaults/attributes';
import {
    GRAPHITE_DARK,
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import AdvancedFilterDropDown from '@Core/components/Grid/AdvancedFilters/DropDown/AdvancedFilterDropDown';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    ADV_FILTERS_IDS,
} from '@Core/defaults/grid/cookies';
import {
    ARROW,
} from '@Core/defaults/icons';
import associatedLabelMixin from '@Core/mixins/inputs/associatedLabelMixin';
import {
    changeCookiePosition,
} from '@Core/models/cookies';
import {
    getDraggedColumnPositionState,
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
        AdvancedFilterDropDown,
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
        filter: {
            type: Object,
            default: null,
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
            draggedElementOnGrid: state => state.draggedElementOnGrid,
            draggedElement: state => state.draggedElement,
        }),
        isFilterExists() {
            return this.draggedElement === this.filter.id
                || (this.draggedElement && this.draggedElement.id === this.filter.id);
        },
        arrowIconFillColor() {
            return this.isFilterExists ? WHITE : GRAPHITE_DARK;
        },
        title() {
            const [
                code,
            ] = this.filter.id.split(':');

            return this.filter.label || `#${code}`;
        },
        hint() {
            const [
                code,
                languageCode,
            ] = this.filter.id.split(':');

            return this.filter.label ? `${code} ${languageCode}` : null;
        },
        filterValue() {
            if (this.filter.value.isEmptyRecord) return 'Empty records';

            const value = [];

            Object.keys(this.filter.value).forEach((key) => {
                if (this.filter.value[key]) {
                    if (this.filter.options) {
                        const optionIds = this.filter.value[key].split(', ');
                        const values = [];

                        optionIds.forEach((id) => {
                            const option = this.filter.options.find(opt => opt.id === id);

                            if (option) {
                                values.push(option.value || `#${option.key}`);
                            }
                        });

                        value.push(values.join(', '));
                    } else {
                        value.push(this.filter.value[key]);
                    }
                }
            });

            return value.join(' - ');
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
            const {
                width,
            } = this.$el.getBoundingClientRect();

            addElementCopyToDocumentBody({
                event,
                element: this.$el,
                width,
                id: this.filter.id,
            });
            this.setDraggedElement(this.filter);
            this.setDraggableState({
                propName: 'draggedElementOnGrid',
                value: DRAGGED_ELEMENT.FILTER,
            });

            window.requestAnimationFrame(() => {
                this.setGhostIndex(this.index);
            });
        },
        onDragEnd(event) {
            changeCookiePosition({
                cookies: this.$cookies,
                cookieName: ADV_FILTERS_IDS,
                from: this.index,
                to: this.ghostIndex,
            });

            removeElementCopyFromDocumentBody(event);
            this.setDraggableState({
                propName: 'draggedElementOnGrid',
                value: null,
            });
            this.setDraggedElement();
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
                || this.draggedElementOnGrid === DRAGGED_ELEMENT.COLUMN) {
                return false;
            }

            this.$emit('swap', {
                from: this.ghostIndex,
                to: this.index,
            });
            this.setGhostIndex(this.index);

            return true;
        },
        onValueChange({
            key, value,
        }) {
            this.$emit('update', {
                index: this.index,
                key,
                value,
            });

            if (this.filter.type === TYPES.SELECT) {
                this.onApply();
            }
        },
        onClear() {
            this.$emit('clear', this.index);
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

                this.$emit('focus', true);
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

            this.$emit('focus', false);
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
                this.deactivateFilter();
                this.$emit('apply');
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
