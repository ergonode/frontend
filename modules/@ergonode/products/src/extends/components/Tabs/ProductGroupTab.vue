/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <AttachedProductsToGroupGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import AttachedProductsToGroupGrid from '@Products/extends/components/Grids/AttachedProductsToGroupGrid';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'ProductGroupTab',
    components: {
        AttachedProductsToGroupGrid,
        CenterViewTemplate,
    },
    mixins: [
        gridDraftMixin,
        extendedGridComponentsMixin,
        tabFeedbackMixin,
    ],
};
</script>
