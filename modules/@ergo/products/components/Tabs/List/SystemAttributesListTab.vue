/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarListWrapper>
        <ListSearchSelectHeader
            v-if="isSelectLanguage"
            header="System Attributes"
            :options="languageOptions"
            :selected-option="language.value"
            :is-expanded="isExpanded"
            @searchResult="onSearch"
            @selectOption="onSelect"
            @expand="onExpand" />
        <ListSearchHeader
            v-else
            header="System Attributes"
            :is-expanded="isExpanded"
            @searchResult="onSearch"
            @expand="onExpand" />
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
        SystemAttributesList: () => import('@Products/components/Lists/SystemAttributesList'),
        ListSearchSelectHeader: () => import('@Core/components/List/ListSearchSelectHeader'),
        ListSearchHeader: () => import('@Core/components/List/ListSearchHeader'),
    },
    props: {
        isSelectLanguage: {
            type: Boolean,
            default: true,
        },
        isExpanded: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            language: {},
        };
    },
    created() {
        this.language = {
            key: this.userLanguageCode,
            value: this.languages[this.userLanguageCode],
        };
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('dictionaries', {
            languages: (state) => state.languages,
        }),
        listDataType() {
            return 'attributes/system';
        },
        languageOptions() {
            return Object.values(this.languages);
        },
    },
    methods: {
        ...mapActions('list', [
            'setFilter',
            'getElements',
        ]),
        onExpand(isExpanded) {
            this.$emit('expand', isExpanded);
        },
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
