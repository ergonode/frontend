/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarList>
        <ListSearchHeader
            title="System languages"
            searchable
            @search="onSearch" />
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
import LanguagesListElement from '@Core/components/Lists/LanguagesListElement';
import PRIVILEGES from '@Core/config/privileges';
import List from '@UI/components/List/List';
import ListScrollableContainer from '@UI/components/List/ListScrollableContainer';
import ListSearchHeader from '@UI/components/List/ListSearchHeader';
import VerticalTabBarList from '@UI/components/TabBar/VerticalTabBarList';
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
