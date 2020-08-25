/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarList>
        <ListSearchHeader
            header="Conditions"
            :is-search="false" />
        <List>
            <ListScrollableContainer>
                <ConditionsListElement
                    v-for="item in items"
                    :key="item.id"
                    :item="item"
                    :disabled="disabled"
                    :language-code="userLanguageCode" />
            </ListScrollableContainer>
        </List>
    </VerticalTabBarList>
</template>

<script>
import {
    mapState,
} from 'vuex';

export default {
    name: 'ConditionsListTab',
    components: {
        VerticalTabBarList: () => import('@Core/components/TabBar/VerticalTabBarList'),
        List: () => import('@Core/components/List/List'),
        ListScrollableContainer: () => import('@Core/components/List/ListScrollableContainer'),
        ConditionsListElement: () => import('@Conditions/components/Lists/ConditionsListElement'),
        ListSearchHeader: () => import('@Core/components/List/ListSearchHeader'),
    },
    props: {
        disabled: {
            type: Boolean,
            deafulr: false,
        },
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
