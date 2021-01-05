/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TreeDesigner
        constant-root
        :columns="columns"
        :row-height="rowHeight"
        :disabled="!isAllowedToUpdate" />
</template>

<script>
import PRIVILEGES from '@Core/config/privileges';
import {
    COLUMNS,
    ROW_HEIGHT,
} from '@Core/defaults/languagesDesigner';
import TreeDesigner from '@UI/components/TreeDesigner/TreeDesigner';

export default {
    name: 'LanguagesTreeWrapper',
    components: {
        TreeDesigner,
    },
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SETTINGS.update,
            ]);
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
