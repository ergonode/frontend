/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <List group>
        <CategoryListElement
            v-for="element in elements[languageCode]"
            :key="element.id"
            :item="element"
            :language-code="languageCode" />
    </List>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'CategoriesList',
    components: {
        List: () => import('~/components/List/List'),
        CategoryListElement: () => import('~/components/List/CategoryListElement'),
    },
    props: {
        languageCode: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState('list', {
            elements: state => state.elements,
        }),
    },
};
</script>
