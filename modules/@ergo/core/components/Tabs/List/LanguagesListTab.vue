/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarListWrapper>
        <ListSearchHeader
            header="System languages"
            is-search
            @searchResult="onSearch" />
        <List>
            <ListScrollableContainer>
                <LanguagesListElement
                    v-for="item in items[userLanguageCode]"
                    :key="item.id"
                    :item="item"
                    :is-draggable="isUserAllowedToUpdateTree"
                    :language-code="userLanguageCode" />
            </ListScrollableContainer>
        </List>
    </VerticalTabBarListWrapper>
</template>

<script>
import { mapState } from 'vuex';
import fetchListDataMixin from '@Core/mixins/list/fetchListDataMixin';

export default {
    name: 'LanguagesListTab',
    components: {
        List: () => import('@Core/components/List/List'),
        ListScrollableContainer: () => import('@Core/components/List/ListScrollableContainer'),
        LanguagesListElement: () => import('@Core/components/Lists/LanguagesListElement'),
        VerticalTabBarListWrapper: () => import('@Core/components/TabBar/VerticalTabBarListWrapper'),
        ListSearchHeader: () => import('@Core/components/List/ListSearchHeader'),
    },
    mixins: [fetchListDataMixin({ namespace: 'languages', extraFilters: 'active=true' })],
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('dictionaries', {
            languages: state => state.languages,
        }),
        isUserAllowedToUpdateTree() {
            return this.$hasAccess(['SETTINGS_UPDATE']);
        },
    },
    watch: {
        languages() {
            this.getItems(this.userLanguageCode);
        },
    },
    methods: {
        onSearch(value) {
            this.codeFilter = value;
            this.getItems(this.userLanguageCode);
        },
    },
};
</script>
