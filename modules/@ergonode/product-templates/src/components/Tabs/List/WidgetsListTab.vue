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

import List from '@Core/components/List/List';
import ListHeader from '@Core/components/List/ListHeader';
import ListScrollableContainer from '@Core/components/List/ListScrollableContainer';
import VerticalTabBarList from '@Core/components/TabBar/VerticalTabBarList';
import WidgetsListElement from '@Templates/components/Lists/Widgets/WidgetsListElement';
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
