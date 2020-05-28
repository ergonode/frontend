/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarListWrapper>
        <ListSearchSelectHeader
            v-if="isSelectLanguage"
            header="System attributes"
            @searchResult="onSearch">
            <template #select>
                <TreeSelect
                    :value="language"
                    solid
                    small
                    :options="languageOptions"
                    @input="onSelect" />
            </template>
        </ListSearchSelectHeader>
        <ListSearchHeader
            v-else
            header="System attributes"
            @searchResult="onSearch" />
        <List>
            <ListScrollableContainer>
                <AttributesListElement
                    v-for="item in items[language.code]"
                    :key="item.id"
                    :item="item"
                    :is-draggable="isUserAllowedToDragAttributes"
                    :language-code="language.code" />
            </ListScrollableContainer>
        </List>
    </VerticalTabBarListWrapper>
</template>

<script>
import { mapState } from 'vuex';
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
        TreeSelect: () => import('@Core/components/Inputs/Select/Tree/TreeSelect'),
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
            language: {},
        };
    },
    computed: {
        ...mapState('authentication', {
            user: state => state.user,
        }),
        ...mapState('core', {
            defaultLanguageCodeByPrivileges: state => state.defaultLanguageCodeByPrivileges,
            languagesTree: state => state.languagesTree,
        }),
        isUserAllowedToDragAttributes() {
            const { languagePrivileges } = this.user;
            const { code } = this.language;

            return this.$hasAccess(['ATTRIBUTE_UPDATE']) && languagePrivileges[code].read;
        },
        languageOptions() {
            const { languagePrivileges } = this.user;

            return this.languagesTree.map(language => ({
                ...language,
                key: language.code,
                value: language.name,
                disabled: !languagePrivileges[language.code].read,
            }));
        },
    },
    created() {
        this.language = this.languageOptions
            .find(languegeCode => languegeCode.code === this.defaultLanguageCodeByPrivileges);
    },
    methods: {
        onSearch(value) {
            this.codeFilter = value;
            this.getItems(this.language.code);
        },
        onSelect(value) {
            this.language = value;

            if (typeof this.items[value.code] === 'undefined') {
                this.getItems(value.code);
            }
        },
    },
};
</script>
