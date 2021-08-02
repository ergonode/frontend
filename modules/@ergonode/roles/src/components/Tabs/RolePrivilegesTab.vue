/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <RolePrivilegesGrid
                :scope="scope"
                :errors="errors"
                :change-values="changeValues" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import RolePrivilegesGrid from '@Roles/components/Grids/RolePrivilegesGrid';

export default {
    name: 'RolePrivilegesTab',
    components: {
        RolePrivilegesGrid,
    },
    mixins: [
        tabFeedbackMixin,
    ],
};
</script>
