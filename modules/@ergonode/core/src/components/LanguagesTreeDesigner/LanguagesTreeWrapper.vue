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
        :is-dragging-enabled="isAllowedToUpdate" />
</template>

<script>
import TemplateGridWrapper from '@Core/components/TemplateGrid/TemplateGridWrapper';
import PRIVILEGES from '@Core/config/privileges';
import {
    COLUMNS,
    CONTEXT_NAME,
    ROW_HEIGHT,
} from '@Core/defaults/languagesDesigner';

export default {
    name: 'LanguagesTreeWrapper',
    components: {
        TemplateGridWrapper,
    },
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SETTINGS.update,
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
