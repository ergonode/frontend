/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <UserLanguageRestrictionsGrid
                :scope="scope"
                :errors="errors" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import UserLanguageRestrictionsGrid from '@Users/components/Grids/UserLanguageRestrictionsGrid';

export default {
    name: 'UserLanguageRestrictionsTab',
    components: {
        UserLanguageRestrictionsGrid,
        CenterViewTemplate,
    },
    mixins: [
        extendedGridComponentsMixin,
    ],
    props: {
        scope: {
            type: String,
            default: '',
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>
