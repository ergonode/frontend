/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarListWrapper>
        <ListSearchSelectHeader
            v-if="isSelectLanguage"
            header="System attributes"
            :options="languageOptions"
            :selected-option="language"
            @searchResult="onSearch"
            @selectOption="onSelect" />
        <ListSearchHeader
            v-else
            header="System attributes"
            @searchResult="onSearch" />
        <List>
            <ListScrollableContainer>
                <AttributesListElement
                    v-for="item in items"
                    :key="item.id"
                    :item="item"
                    :is-draggable="isUserAllowedToDragAttributes"
                    :language-code="languageCode" />
            </ListScrollableContainer>
        </List>
    </VerticalTabBarListWrapper>
</template>

<script>
import { mapState } from 'vuex';
import { getKeyByValue } from '@Core/models/objectWrapper';
import fetchListDataMixin from '@Core/mixins/list/fetchListDataMixin';

export default {
    name: 'SystemAttributesListTab',
    components: {
        VerticalTabBarListWrapper: () => import('@Core/components/Tab/VerticalTabBarListWrapper'),
        ListSearchSelectHeader: () => import('@Core/components/List/ListSearchSelectHeader'),
        ListSearchHeader: () => import('@Core/components/List/ListSearchHeader'),
        List: () => import('@Core/components/List/List'),
        ListScrollableContainer: () => import('@Core/components/List/ListScrollableContainer'),
        AttributesListElement: () => import('@Attributes/components/Lists/AttributesListElement'),

    },
    mixins: [fetchListDataMixin({ namespace: 'attributes/system' })],
    props: {
        isSelectLanguage: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            language: '',
        };
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('dictionaries', {
            languages: state => state.languages,
        }),
        languageOptions() {
            return Object.values(this.languages);
        },
        languageCode() {
            return getKeyByValue(this.languages, this.language);
        },
        isUserAllowedToDragAttributes() {
            return this.$hasAccess(['ATTRIBUTE_UPDATE']);
        },
    },
    created() {
        this.language = this.languages[this.userLanguageCode];
    },
    methods: {
        onSearch(value) {
            this.codeFilter = value;
            this.getItems(this.languageCode);
        },
        onSelect(value) {
            this.language = value;
            this.getItems(this.languageCode);
        },
    },
};
</script>
