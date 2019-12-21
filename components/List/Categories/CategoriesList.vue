/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <List>
        <ListScrollableContainer>
            <CategoriesListElement
                v-for="element in elementsByLanguageCode"
                :key="element.id"
                :item="element"
                :language-code="languageCode" />
        </ListScrollableContainer>
    </List>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'CategoriesList',
    components: {
        List: () => import('@Core/components/List/List'),
        ListScrollableContainer: () => import('@Core/components/List/ListScrollableContainer'),
        CategoriesListElement: () => import('~/components/List/Categories/CategoriesListElement'),
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
        elementsByLanguageCode() {
            const { [this.languageCode]: language } = this.elements;
            if (!language || language.length === 0) return [];

            return language;
        },
    },
};
</script>
