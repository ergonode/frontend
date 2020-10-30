/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarList>
        <ListSearchHeader
            title="Conditions"
            :is-search="false" />
        <List>
            <ListScrollableContainer>
                <ConditionsListElement
                    v-for="item in items"
                    :key="item.id"
                    :item="item"
                    :disabled="disabled" />
            </ListScrollableContainer>
        </List>
    </VerticalTabBarList>
</template>

<script>
import ConditionsListElement from '@Conditions/components/Lists/ConditionsListElement';
import List from '@UI/components/List/List';
import ListScrollableContainer from '@UI/components/List/ListScrollableContainer';
import ListSearchHeader from '@UI/components/List/ListSearchHeader';
import VerticalTabBarList from '@UI/components/TabBar/VerticalTabBarList';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ConditionsListTab',
    components: {
        VerticalTabBarList,
        List,
        ListScrollableContainer,
        ConditionsListElement,
        ListSearchHeader,
    },
    props: {
        disabled: {
            type: Boolean,
            deafulr: false,
        },
    },
    computed: {
        ...mapState('condition', {
            items: state => state.conditionsDictionary,
        }),
    },
};
</script>
