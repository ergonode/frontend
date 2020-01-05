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
            :selected-option="attributesLanguageCode"
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
        <SystemAttributesList :language-code="attributesLanguageCode" />
    </VerticalTabBarListWrapper>
</template>

<script>
import { mapState, mapActions } from 'vuex';

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
            listDataType: 'attributes/system',
            attributesLanguageCode: null,
        };
    },
    created() {
        this.attributesLanguageCode = this.userLanguageCode;
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('dictionaries', {
            languages: (state) => state.languages,
        }),
        languageOptions() {
            return Object.keys(this.languages).map((language) => ({
                id: language,
                name: this.languages[language],
            }));
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
                languageCode: this.attributesLanguageCode,
            });
        },
        onSelect(option) {
            this.attributesLanguageCode = option;
            this.getElements({
                listType: this.listDataType,
                languageCode: option,
            });
        },
    },
};
</script>
