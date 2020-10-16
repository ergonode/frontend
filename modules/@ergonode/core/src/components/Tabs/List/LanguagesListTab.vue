/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarList>
        <ListSearchHeader
            title="System languages"
            is-search
            @search-result="onSearch" />
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
import List from '@Core/components/List/List';
import ListScrollableContainer from '@Core/components/List/ListScrollableContainer';
import ListSearchHeader from '@Core/components/List/ListSearchHeader';
import LanguagesListElement from '@Core/components/Lists/LanguagesListElement';
import VerticalTabBarList from '@Core/components/TabBar/VerticalTabBarList';
import PRIVILEGES from '@Core/config/privileges';
import {
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'LanguagesListTab',
    components: {
        List,
        ListScrollableContainer,
        LanguagesListElement,
        VerticalTabBarList,
        ListSearchHeader,
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
