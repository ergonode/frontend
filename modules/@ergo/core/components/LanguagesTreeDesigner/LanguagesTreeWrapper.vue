/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplateGridWrapper
        constant-root
        :columns="columns"
        :row-height="rowHeight"
        :context-name="contextName"
        :is-dragging-enabled="$hasAccess(['SETTINGS_UPDATE'])" />
</template>

<script>
import TemplateGridWrapper from '@Core/components/TemplateGrid/TemplateGridWrapper';
import { COLUMNS, CONTEXT_NAME, ROW_HEIGHT } from '@Core/defaults/languagesDesigner';

export default {
    name: 'LanguagesTreeWrapper',
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
