/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputUUIDProvider>
        <template #default="{ uuid }">
            <div
                :class="classes"
                :draggable="!isFocused && draggable"
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
                        :for="uuid"
                        v-text="title" />
                    <input
                        :id="uuid"
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
                        <IconArrowDropdown
                            class="advanced-filter__icon"
                            :state="arrowIconState"
                            :fill-color="arrowIconFillColor" />
                    </div>
                </div>
                <AdvancedFilterDropdown
                    v-if="isReadyToRender"
                    ref="menu"
                    :parent-reference="$refs.activator"
                    :visible="isFocused"
                    :fixed="fixedContent"
                    @click-outside="onClickOutside">
                    <slot
                        name="dropdown"
                        :on-apply="onApply" />
                </AdvancedFilterDropdown>
            </div>
        </template>
    </InputUUIDProvider>
</template>

<script>
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    addElementCopyToDocumentBody,
    removeElementCopyFromDocumentBody,
} from '@Core/models/layout/ElementCopy';
import {
    GRAPHITE_DARK,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import AdvancedFilterDropdown from '@UI/components/AdvancedFilters/Dropdown/AdvancedFilterDropdown';
import {
    getDraggedColumnPositionState,
} from '@UI/models/dragAndDrop/helpers';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AdvancedFilter',
    components: {
        AdvancedFilterDropdown,
    },
    props: {
        /**
         * Context scope
         */
        scope: {
            type: String,
            default: '',
        },
        /**
         * Index of given component at the loop
         */
        index: {
            type: Number,
            required: true,
        },
        /**
         * Filter unique identifier
         */
        filterId: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        /**
         *  The hint is a tip for the component
         */
        hint: {
            type: String,
            default: '',
        },
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * Filter might have parameters which are used for describing field
         */
        parameters: {
            type: String,
            default: '',
        },
        /**
         * Component value
         */
        value: {
            type: [
                String,
                Number,
            ],
            default: '',
        },
        /**
         * Determines state of draggable attribute
         */
        draggable: {
            type: Boolean,
            default: true,
        },
        /**
         * The dismissible flag is telling if we can toggle between active an inactive state
         */
        dismissible: {
            type: Boolean,
            default: false,
        },
        /**
         * The flag which tells if the dropdown has fixed content to it's parent width
         */
        fixedContent: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            mouseUpTime: 0,
            isFocused: false,
            isClickedOutside: false,
            isReadyToRender: false,
        };
    },
    computed: {
        ...mapState('draggable', [
            'ghostIndex',
            'isElementDragging',
            'isOverDropZone',
            'draggedElement',
        ]),
        classes() {
            return [
                'advanced-filter',
                {
                    'advanced-filter--selected': this.isFocused,
                    'advanced-filter--exists': this.isFilterExists,
                },
            ];
        },
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
            '__setState',
        ]),
        ...mapActions('list', [
            'setDisabledScopeElement',
        ]),
        onDragStart(event) {
            addElementCopyToDocumentBody({
                event,
                id: this.filterId,
                label: this.title,
            });
            this.__setState({
                key: 'draggedElement',
                value: this.filterId,
            });
            this.__setState({
                key: 'draggedInScope',
                value: this.scope,
            });
            this.__setState({
                key: 'isElementDragging',
                value: DRAGGED_ELEMENT.FILTER,
            });

            requestAnimationFrame(() => {
                this.__setState({
                    key: 'ghostIndex',
                    value: this.index,
                });
            });
        },
        onDragEnd(event) {
            removeElementCopyFromDocumentBody(event);

            if (this.isOverDropZone) {
                this.__setState({
                    key: 'isOverDropZone',
                    value: false,
                });

                this.$emit('remove', this.index);
            }

            this.__setState({
                key: 'isElementDragging',
                value: null,
            });
            this.__setState({
                key: 'draggedElement',
                value: null,
            });
            this.__setState({
                key: 'draggedInScope',
                value: '',
            });
            this.__setState({
                key: 'ghostIndex',
                value: -1,
            });
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
            this.__setState({
                key: 'ghostIndex',
                value: this.index,
            });
            return true;
        },
        onApply() {
            this.deactivateFilter();
            this.$emit('apply');
        },
        onFocus() {
            if (!this.isFocused && this.mouseUpTime > 0) {
                this.isFocused = true;

                if (!this.isReadyToRender) {
                    this.isReadyToRender = true;
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

            if (this.isClickedOutside || this.dismissible) {
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
        border: $BORDER_2_WHITESMOKE;
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
            border-color: $GREEN;
            background-color: $WHITE;
        }
    }
</style>
