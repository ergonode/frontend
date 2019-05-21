/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="editableCellClasses">
        <Component
            :is="editableComponent"
            v-model="localValue"
            v-bind="editableComponentProps"
            @imageid="onImageIDChange" />
    </div>
</template>

<script>

export default {
    name: 'GridEditableCell',
    props: {
        value: {
            type: [String, Number, Array, Boolean],
            required: true,
        },
        type: {
            type: String,
            required: false,
            default: null,
        },
        isSelectKind: {
            type: Boolean,
            required: false,
            default: false,
        },
        isMultiSelect: {
            type: Boolean,
            required: false,
            default: false,
        },
        options: {
            type: Array,
            required: false,
            default: () => [],
        },
        errorMessages: {
            type: [String, Array],
            required: false,
            default: '',
        },
    },
    data() {
        return {
            localValue: this.value,
        };
    },
    destroyed() {
        this.$emit('updateDraft', this.localValue);
    },
    computed: {
        editableCellClasses() {
            return [
                'editable-cell',
                `editable-cell--${this.isSelectKind ? 'select' : 'text'}`,
            ];
        },
        isTextAreaType() {
            return this.type === 'TEXT_AREA';
        },
        isImageType() {
            return this.type === 'IMAGE';
        },
        editableComponent() {
            if (this.isSelectKind) return () => import('~/components/Grid/GridAttributeSelectCell');
            if (this.isTextAreaType) return () => import('~/components/Inputs/TextArea');
            if (this.isImageType) return () => import('~/components/Grid/GridEditableImageCell');

            return () => import('~/components/Inputs/TextField');
        },
        editableComponentProps() {
            if (this.isImageType) {
                return {
                    value: this.value,
                };
            }

            const baseProps = {
                autofocus: true,
                errorMessages: this.errorMessages,
            };

            if (this.isSelectKind) {
                return {
                    ...baseProps,
                    multiselect: this.isMultiSelect,
                    options: this.options,
                };
            }

            return {
                ...baseProps,
                leftAlignment: true,
            };
        },
    },
    methods: {
        onImageIDChange(id) {
            this.localValue = id;
        },
    },
};
</script>

<style lang="scss" scoped>
    .editable-cell {
        position: absolute;
        z-index: 999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 8px;
        background-color: $white;
        box-shadow:
            0 6px 10px 0 rgba(0, 0, 0, 0.14),
            0 1px 18px 0 rgba(0, 0, 0, 0.12),
            0 3px 5px -1px rgba(0, 0, 0, 0.2);

        &--text {
            top: -4px;
            left: -4px;
            padding: 8px;
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);
            min-width: calc(100% + 8px);
            min-height: calc(100% + 8px);
        }

        &--select {
            position: relative;
            flex: 1;
            padding: 0;
        }
    }
</style>
