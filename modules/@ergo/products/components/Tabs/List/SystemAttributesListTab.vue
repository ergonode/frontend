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
            :selected-option="language.value"
            @searchResult="onSearch"
            @selectOption="onSelect" />
        <ListSearchHeader
            v-else
            header="System attributes"
            @searchResult="onSearch" />
        <SystemAttributesList :language-code="language.key" />
    </VerticalTabBarListWrapper>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getKeyByValue } from '@Core/models/objectWrapper';

export default {
    name: 'SystemAttributesListTab',
    components: {
        VerticalTabBarListWrapper: () => import('@Core/components/Tab/VerticalTabBarListWrapper'),
        SystemAttributesList: () => import('@Attributes/components/Lists/SystemAttributesList'),
        ListSearchSelectHeader: () => import('@Core/components/List/ListSearchSelectHeader'),
        ListSearchHeader: () => import('@Core/components/List/ListSearchHeader'),
    },
    props: {
        isSelectLanguage: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            language: {},
        };
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('dictionaries', {
            languages: state => state.languages,
        }),
        listDataType() {
            return 'attributes/system';
        },
        languageOptions() {
            return Object.values(this.languages);
        },
    },
    created() {
        this.language = {
            key: this.userLanguageCode,
            value: this.languages[this.userLanguageCode],
        };
    },
    methods: {
        ...mapActions('list', [
            'setFilter',
            'getElements',
        ]),
        onSearch(value) {
            this.setFilter(value);
            this.getElements({
                listType: this.listDataType,
                languageCode: this.language.key,
            });
        },
        onSelect(value) {
            this.language = {
                key: getKeyByValue(this.languages, value),
                value,
            };

            this.getElements({
                listType: this.listDataType,
                languageCode: this.language.key,
            });
        },
    },
};
</script>
