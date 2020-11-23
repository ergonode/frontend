/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarList>
        <ListHeader title="Widgets" />
        <List>
            <ListScrollableContainer>
                <WidgetsListElement
                    v-for="(widget, index) in widgets"
                    :key="index"
                    :item="widget" />
            </ListScrollableContainer>
        </List>
    </VerticalTabBarList>
</template>

<script>

import WidgetsListElement from '@Templates/components/Lists/Widgets/WidgetsListElement';
import List from '@UI/components/List/List';
import ListHeader from '@UI/components/List/ListHeader';
import ListScrollableContainer from '@UI/components/List/ListScrollableContainer';
import VerticalTabBarList from '@UI/components/TabBar/VerticalTabBarList';
import {
    mapState,
} from 'vuex';

export default {
    name: 'WidgetsListTab',
    components: {
        VerticalTabBarList,
        List,
        ListScrollableContainer,
        WidgetsListElement,
        ListHeader,
    },
    computed: {
        ...mapState('productTemplate', [
            'types',
        ]),
        widgets() {
            return this.types.filter(type => type.variant === 'ui');
        },
    },
};
</script>
