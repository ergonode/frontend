/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import AttachedProductsToGroupGrid from '@Products/extends/components/Grids/AttachedProductsToGroupGrid';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'ProductGroupTab',
    components: {
        AttachedProductsToGroupGrid,
        CenterViewTemplate,
    },
    mixins: [
        tabFeedbackMixin,
    ],
};
</script>
