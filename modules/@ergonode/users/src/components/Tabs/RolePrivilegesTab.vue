/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <RolePrivilegesGrid
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import RolePrivilegesGrid from '@Users/components/Grids/RolePrivilegesGrid';

export default {
    name: 'RolePrivilegesTab',
    components: {
        RolePrivilegesGrid,
        CenterViewTemplate,
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
};
</script>
