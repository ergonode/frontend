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
                    v-for="item in activeLanguages"
                    :key="item.id"
                    :item="item"
                    :is-draggable="isUserAllowedToUpdateTree"
                    :language-code="userLanguageCode" />
            </ListScrollableContainer>
        </List>
    </VerticalTabBarListWrapper>
</template>

<script>
import {
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'LanguagesListTab',
    components: {
        List: () => import('@Core/components/List/List'),
        ListScrollableContainer: () => import('@Core/components/List/ListScrollableContainer'),
        LanguagesListElement: () => import('@Core/components/Lists/LanguagesListElement'),
        VerticalTabBarListWrapper: () => import('@Core/components/TabBar/VerticalTabBarListWrapper'),
        ListSearchHeader: () => import('@Core/components/List/ListSearchHeader'),
    },
    data() {
        return {
            filteredValue: '',
        };
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('core', {
            languages: state => state.languages,
        }),
        ...mapGetters('core', [
            'getActiveLanguages',
        ]),
        activeLanguages() {
            if (this.filteredValue) {
                const rgx = new RegExp(this.filteredValue, 'i');

                return this.getActiveLanguages.filter(
                    ({
                        code, name,
                    }) => code.match(rgx) || name.match(rgx),
                );
            }
            return this.getActiveLanguages;
        },
        isUserAllowedToUpdateTree() {
            return this.$hasAccess([
                'SETTINGS_UPDATE',
            ]);
        },
    },
    methods: {
        onSearch(value) {
            this.filteredValue = value;
        },
    },
};
</script>
