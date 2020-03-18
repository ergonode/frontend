/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarListWrapper>
        <ListSearchHeader
            header="Conditions"
            :is-search="false" />
        <List>
            <ListScrollableContainer>
                <ConditionsListElement
                    v-for="item in items"
                    :key="item.id"
                    :item="item"
                    :language-code="userLanguageCode" />
            </ListScrollableContainer>
        </List>
    </VerticalTabBarListWrapper>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ConditionsListTab',
    components: {
        VerticalTabBarListWrapper: () => import('@Core/components/Tab/VerticalTabBarListWrapper'),
        List: () => import('@Core/components/List/List'),
        ListScrollableContainer: () => import('@Core/components/List/ListScrollableContainer'),
        ConditionsListElement: () => import('@Conditions/components/Lists/ConditionsListElement'),
        ListSearchHeader: () => import('@Core/components/List/ListSearchHeader'),
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('conditions', {
            items: state => state.conditionsDictionary,
        }),
    },
};
</script>
