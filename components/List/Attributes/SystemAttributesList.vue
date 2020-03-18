/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <List>
        <ListScrollableContainer>
            <AttributesListElement
                v-for="element in elements[languageCode]"
                :key="element.id"
                :item="element"
                :language-code="languageCode" />
        </ListScrollableContainer>
    </List>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'SystemAttributesList',
    components: {
        List: () => import('~/core/components/List/List'),
        ListScrollableContainer: () => import('~/core/components/List/ListScrollableContainer'),
        AttributesListElement: () => import('~/components/List/Attributes/AttributesListElement'),
    },
    props: {
        languageCode: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState('list', {
            elements: (state) => state.elements,
        }),
    },
};
</script>
