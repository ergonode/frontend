/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="editableComponent"
        v-model="localValue"
        v-bind="$attrs"
        @focus="onFocus" />
</template>

<script>
import { TYPES } from '@Attributes/defaults/attributes';

export default {
    name: 'GridEditFilterCell',
    inheritAttrs: false,
    data() {
        return {
            localValue: this.$attrs.value,
        };
    },
    destroyed() {
        this.$emit('updateValue', this.localValue);
    },
    computed: {
        editableComponent() {
            switch (this.$attrs.type) {
            case TYPES.TEXTAREA:
                return () => import('@Core/components/Grid/EditCells/GridEditLongTextCell');
            case TYPES.DATE:
                return () => import('@Core/components/Grid/EditCells/GridEditDateCell');
            case TYPES.LABEL:
                return () => import('@Core/components/Grid/EditCells/GridEditStatusSelectCell');
            case TYPES.SELECT:
            case TYPES.MULTI_SELECT:
                return () => import('@Core/components/Grid/EditCells/GridEditSelectCell');
            default: return () => import('@Core/components/Grid/EditCells/GridEditShortTextCell');
            }
        },
    },
    methods: {
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
    },
};
</script>
