/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarListWrapper>
        <ListSearchTreeSelectHeader
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
        ListSearchTreeSelectHeader: () => import('@Core/components/List/ListSearchTreeSelectHeader'),
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
            language: {},
        };
    },
    computed: {
        ...mapState('authentication', {
            user: state => state.user,
        }),
        ...mapState('core', {
            languagePrivilegesDefaultCode: state => state.languagePrivilegesDefaultCode,
        }),
        ...mapState('dictionaries', {
            languagesTree: state => state.languagesTree,
        }),
        isUserAllowedToDragAttributes() {
            const { languagePrivileges } = this.user;
            const { code } = this.language;

            return this.$hasAccess(['ATTRIBUTE_UPDATE']) && languagePrivileges[code].read;
        },
        languageOptions() {
            return Object.values(this.languagesTree).map(language => ({
                ...language,
                key: language.code,
                value: language.name,
                disabled: !language.privileges.read,
            }));
        },
    },
    created() {
        this.language = this.languageOptions
            .find(languegeCode => languegeCode.code === this.languagePrivilegesDefaultCode);
    },
    methods: {
        onSearch(value) {
            this.codeFilter = value;
            this.getItems(this.language.code);
        },
        onSelect(value) {
            this.language = value;
            this.getItems(value.code);
        },
    },
};
</script>
