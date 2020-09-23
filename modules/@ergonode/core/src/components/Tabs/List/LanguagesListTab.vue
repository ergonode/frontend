/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarList>
        <ListSearchHeader
            header="System languages"
            is-search
            @searchResult="onSearch" />
        <List>
            <ListScrollableContainer>
                <LanguagesListElement
                    v-for="item in filteredLanguages"
                    :key="item.id"
                    :item="item"
                    :is-draggable="isAllowedToUpdate"
                    :language-code="userLanguageCode" />
            </ListScrollableContainer>
        </List>
    </VerticalTabBarList>
</template>

<script>
import PRIVILEGES from '@Core/config/privileges';
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
        VerticalTabBarList: () => import('@Core/components/TabBar/VerticalTabBarList'),
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
        ...mapState('core', [
            'languages',
        ]),
        ...mapGetters('core', [
            'activeLanguages',
        ]),
        filteredLanguages() {
            if (this.filteredValue) {
                const rgx = new RegExp(this.filteredValue, 'i');

                return this.activeLanguages.filter(
                    ({
                        code, name,
                    }) => code.match(rgx) || name.match(rgx),
                );
            }

            return this.activeLanguages;
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SETTINGS.update,
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
