/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="editCellClasses">
        <Component
            :is="editableComponent"
            v-model="localValue"
            :row-id="rowId"
            :error-messages="errorMessages"
            :options="options"
            :parameters="parameters"
            :multiselect="isMultiSelect"
            :fixed-width="fixedWidth"
            :colors="colors"
            @imageid="onImageIDChange" />
    </div>
</template>

<script>
import { AttributeTypes } from '~/defaults/attributes/main';

export default {
    name: 'GridEditActivatorCell',
    props: {
        namespace: {
            type: String,
            required: true,
        },
        rowId: {
            type: [String, Number],
            default: null,
        },
        value: {
            type: [String, Number, Array, Boolean],
            required: true,
        },
        type: {
            type: String,
            default: null,
        },
        isMultiSelect: {
            type: Boolean,
            default: false,
        },
        options: {
            type: Array,
            default: () => [],
        },
        colors: {
            type: Object,
            default: null,
        },
        parameters: {
            type: Object,
            default: () => {},
        },
        errorMessages: {
            type: [String, Array],
            default: '',
        },
        fixedWidth: {
            type: Number,
            required: true,
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
            ];
        },
        editableComponent() {
            switch (this.type) {
            case AttributeTypes.TEXTAREA:
                return () => import('~/components/Grid/EditCells/GridEditLongTextCell');
            case AttributeTypes.IMAGE:
                return () => import('~/components/Grid/EditCells/GridEditImageCell');
            case AttributeTypes.DATE:
                return () => import('~/components/Grid/EditCells/GridEditDateCell');
            case AttributeTypes.LABEL:
                return () => import('~/components/Grid/EditCells/GridEditStatusSelectCell');
            case AttributeTypes.SELECT:
            case AttributeTypes.MULTI_SELECT:
                return () => import('~/components/Grid/EditCells/GridEditSelectCell');
            default: return () => import('~/components/Grid/EditCells/GridEditShortTextCell');
            }
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
    .edit-cell {
        position: fixed;
        z-index: 999;
        display: flex;
        justify-content: center;
    }
</style>
