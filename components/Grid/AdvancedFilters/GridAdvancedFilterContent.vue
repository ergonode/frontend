/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="filterContentByType"
        :value="value" />
</template>

<script>
import { AttributeTypes } from '~/defaults/attributes/main';

export default {
    name: 'GridAdvancedFilterContent',
    props: {
        type: {
            type: String,
            required: true,
        },
        value: {
            type: [String],
            required: true,
        },
    },
    computed: {
        filterContentByType() {
            switch (this.type) {
            case AttributeTypes.TEXT:
                return () => import('~/components/Grid/AdvancedFilters/GridAdvancedFilterTextContent');
            default: return () => import('~/components/Grid/AdvancedFilters/GridAdvancedFilterTextContent');
            }
        },
    },
};
</script>
