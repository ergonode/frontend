/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplateGridWrapper
        :columns="columns"
        :row-height="rowHeight"
        :context-name="contextName"
        :is-dragging-enabled="$hasAccess(['CATEGORY_TREE_UPDATE'])" />
</template>

<script>
import { ROW_HEIGHT, COLUMNS, CONTEXT_NAME } from '@Trees/defaults/designer';
import TemplateGridWrapper from '@Core/components/TemplateGrid/TemplateGridWrapper';

export default {
    name: 'CategoryTreeWrapper',
    components: {
        TemplateGridWrapper,
    },
    computed: {
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
