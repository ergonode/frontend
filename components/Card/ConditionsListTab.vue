/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab-wrapper">
        <ListSearchHeader
            header="Conditions"
            @searchResults="onSearch" />
        <ConditionsList :language-code="userLanguageCode" />
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ConditionsListTab',
    components: {
        ConditionsList: () => import('~/components/List/ConditionsList'),
        ListSearchHeader: () => import('~/components/List/ListSearchHeader'),
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
    },
    methods: {
        onSearch() {
            // TODO: Add whenever we handle it at the BE
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-wrapper {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 275px;
    }
</style>
