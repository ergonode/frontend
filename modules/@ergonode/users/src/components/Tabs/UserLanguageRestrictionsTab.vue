/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <UserLanguageRestrictionsGrid
                :scope="scope"
                :errors="errors"
                :change-values="changeValues" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import UserLanguageRestrictionsGrid from '@Users/components/Grids/UserLanguageRestrictionsGrid';

export default {
    name: 'UserLanguageRestrictionsTab',
    components: {
        UserLanguageRestrictionsGrid,
    },
    mixins: [
        tabFeedbackMixin,
    ],
};
</script>
