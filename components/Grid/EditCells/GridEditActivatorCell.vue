/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="editCellClasses">
        <Component
            :is="editableComponent"
            v-model="localValue"
            v-bind="editableComponentProps"
            @imageid="onImageIDChange"
            @focus="onFocus" />
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'GridEditActivatorCell',
    props: {
        value: {
            type: [String, Number, Array, Boolean],
            required: true,
        },
        type: {
            type: String,
            default: null,
        },
        isSelectKind: {
            type: Boolean,
            default: false,
        },
        isMultiSelect: {
            type: Boolean,
            default: false,
        },
        options: {
            type: Array,
            default: () => [],
        },
        parameters: {
            type: Object,
            default: () => {},
        },
        errorMessages: {
            type: [String, Array],
            default: '',
        },
    },
    data() {
        return {
            localValue: this.value,
        };
    },
    destroyed() {
        this.$emit('updateValue', this.localValue);
    },
    computed: {
        editCellClasses() {
            return [
                'edit-cell',
                `edit-cell--${this.isSelectKind || this.isDateType ? 'select' : 'text'}`,
            ];
        },
        isTextAreaType() {
            return this.type === 'TEXT_AREA';
        },
        isImageType() {
            return this.type === 'IMAGE';
        },
        isDateType() {
            return this.type === 'DATE';
        },
        editableComponent() {
            if (this.isSelectKind) return () => import('~/components/Grid/EditCells/GridEditSelectCell');
            if (this.isTextAreaType) return () => import('~/components/Inputs/TextArea');
            if (this.isImageType) return () => import('~/components/Grid/EditCells/GridEditImageCell');
            if (this.isDateType) return () => import('~/components/Grid/EditCells/GridEditDateCell');

            return () => import('~/components/Inputs/TextField');
        },
        editableComponentProps() {
            if (this.isImageType) {
                return { value: this.value };
            }

            if (this.isDateType) {
                return {
                    errorMessages: this.errorMessages,
                    parameters: this.parameters,
                };
            }

            if (this.isSelectKind) {
                return {
                    errorMessages: this.errorMessages,
                    multiselect: this.isMultiSelect,
                    options: this.options,
                };
            }

            return {
                autofocus: true,
                errorMessages: this.errorMessages,
                leftAlignment: true,
            };
        },
    },
    methods: {
        ...mapActions('grid', [
            'setEditingCellCoordinates',
        ]),
        onImageIDChange(id) {
            this.localValue = id;
        },
        onFocus(isFocused) {
            if (!isFocused) {
                this.setEditingCellCoordinates();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .edit-cell {
        position: absolute;
        z-index: 999;
        display: flex;
        justify-content: center;
        background-color: $white;

        &--text {
            top: -4px;
            left: -4px;
            padding: 4px;
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);
            min-width: 100%;
            min-height: 100%;
        }

        &--select {
            position: relative;
            flex: 1;
        }
    }
</style>
