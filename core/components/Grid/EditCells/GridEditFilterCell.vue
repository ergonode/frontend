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
import { TYPES } from '~/defaults/attributes';

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
            case TYPES.TEXT_AREA:
                return () => import('~/core/components/Grid/EditCells/GridEditLongTextCell');
            case TYPES.DATE:
                return () => import('~/core/components/Grid/EditCells/GridEditDateCell');
            case TYPES.LABEL:
                return () => import('~/core/components/Grid/EditCells/GridEditStatusSelectCell');
            case TYPES.SELECT:
            case TYPES.MULTI_SELECT:
                return () => import('~/core/components/Grid/EditCells/GridEditSelectCell');
            default: return () => import('~/core/components/Grid/EditCells/GridEditShortTextCell');
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
