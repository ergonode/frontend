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
    name: 'GridEditDataCell',
    inheritAttrs: false,
    data() {
        return {
            localValue: this.$attrs.value,
        };
    },
    computed: {
        editableComponent() {
            switch (this.$attrs.type) {
            case TYPES.IMAGE:
                return () => import('@Core/components/Grid/EditCells/GridEditImageCell');
            case TYPES.LABEL:
                return () => import('@Core/components/Grid/EditCells/GridEditStatusSelectCell');
            case TYPES.SELECT:
            case TYPES.MULTI_SELECT:
                return () => import('@Core/components/Grid/EditCells/GridEditSelectCell');
            default: return () => import('@Core/components/Grid/EditCells/GridEditShortTextCell');
            }
        },
    },
    destroyed() {
        this.$emit('updateValue', this.localValue);
    },
    methods: {
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
    },
};
</script>
