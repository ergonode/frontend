/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarListWrapper>
        <ListSearchHeader
            header="Conditions"
            :is-search="false" />
        <ConditionsList :language-code="userLanguageCode" />
    </VerticalTabBarListWrapper>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ConditionsListTab',
    components: {
        VerticalTabBarListWrapper: () => import('@Core/components/Tab/VerticalTabBarListWrapper'),
        ConditionsList: () => import('@Conditions/components/Lists/ConditionsList'),
        ListSearchHeader: () => import('@Core/components/List/ListSearchHeader'),
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
    },
};
</script>
