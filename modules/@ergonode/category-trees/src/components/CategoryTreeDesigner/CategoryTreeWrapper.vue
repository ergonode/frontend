/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplateGrid
        :scope="scope"
        :change-values="changeValues"
        :errors="errors"
        :columns="columns"
        :row-height="rowHeight"
        :context-name="contextName"
        :is-dragging-enabled="isAllowedToUpdate" />
</template>

<script>
import TemplateGrid from '@Core/components/TemplateGrid/TemplateGrid';
import PRIVILEGES from '@Trees/config/privileges';
import {
    COLUMNS,
    CONTEXT_NAME,
    ROW_HEIGHT,
} from '@Trees/defaults/designer';

export default {
    name: 'CategoryTreeWrapper',
    components: {
        TemplateGrid,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        changeValues: {
            type: Object,
            default: () => ({}),
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY_TREE.update,
            ]);
        },
        contextName() {
            return CONTEXT_NAME;
        },
        columns() {
            return COLUMNS;
        },
        rowHeight() {
            return ROW_HEIGHT;
        },
    },
};
</script>
