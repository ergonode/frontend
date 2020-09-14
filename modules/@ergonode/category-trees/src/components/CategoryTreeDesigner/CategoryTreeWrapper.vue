/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplateGridWrapper
        :columns="columns"
        :row-height="rowHeight"
        :context-name="contextName"
        :is-dragging-enabled="isAllowedToUpdate" />
</template>

<script>
import TemplateGridWrapper from '@Core/components/TemplateGrid/TemplateGridWrapper';
import PRIVILEGES from '@Trees/config/privileges';
import {
    COLUMNS,
    CONTEXT_NAME,
    ROW_HEIGHT,
} from '@Trees/defaults/designer';

export default {
    name: 'CategoryTreeWrapper',
    components: {
        TemplateGridWrapper,
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
