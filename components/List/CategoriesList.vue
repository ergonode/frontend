/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <List>
        <div class="elements-wrapper">
            <CategoryListElement
                v-for="element in elementsByLanguageCode"
                :key="element.id"
                :item="element"
                :language-code="languageCode" />
        </div>
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
        elementsByLanguageCode() {
            const { [this.languageCode]: language } = this.elements;
            if (!language || language.length === 0) return [];

            return language;
        },
    },
};
</script>

<style lang="scss" scoped>
    .elements-wrapper {
        height: 0;
    }
</style>
