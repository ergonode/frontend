/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarList>
        <ListSearchSelectHeader
            v-if="isSelectLanguage"
            title="System attributes"
            @search-result="onSearch">
            <template #select>
                <TreeSelect
                    :value="language"
                    :size="smallSize"
                    :options="languageOptions"
                    @input="onSelect" />
            </template>
        </ListSearchSelectHeader>
        <ListSearchHeader
            v-else
            title="System attributes"
            @search-result="onSearch" />
        <List>
            <ListScrollableContainer>
                <AttributesListElement
                    v-for="item in items[language.code]"
                    :key="item.id"
                    :item="item"
                    :is-draggable="isAllowedToUpdate"
                    :language-code="language.code" />
            </ListScrollableContainer>
        </List>
    </VerticalTabBarList>
</template>

<script>
import AttributesListElement from '@Attributes/components/Lists/AttributesListElement';
import PRIVILEGES from '@Attributes/config/privileges';
import List from '@Core/components/List/List';
import ListScrollableContainer from '@Core/components/List/ListScrollableContainer';
import ListSearchHeader from '@Core/components/List/ListSearchHeader';
import ListSearchSelectHeader from '@Core/components/List/ListSearchSelectHeader';
import TreeSelect from '@Core/components/Select/Tree/TreeSelect';
import VerticalTabBarList from '@Core/components/TabBar/VerticalTabBarList';
import {
    SIZE,
} from '@Core/defaults/theme';
import fetchListDataMixin from '@Core/mixins/list/fetchListDataMixin';
import {
    mapState,
} from 'vuex';

export default {
    name: 'SystemAttributesListTab',
    components: {
        VerticalTabBarList,
        ListSearchSelectHeader,
        ListSearchHeader,
        List,
        ListScrollableContainer,
        AttributesListElement,
        TreeSelect,
    },
    mixins: [
        fetchListDataMixin({
            namespace: 'attributes/system',
        }),
    ],
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
            languagePrivileges: state => state.user.languagePrivileges,
        }),
        ...mapState('core', [
            'defaultLanguageCode',
            'languagesTree',
        ]),
        smallSize() {
            return SIZE.SMALL;
        },
        isAllowedToUpdate() {
            const {
                code,
            } = this.language;

            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.update,
            ]) && this.languagePrivileges[code].read;
        },
        languageOptions() {
            return this.languagesTree.map(language => ({
                ...language,
                key: language.code,
                value: language.name,
                disabled: this.languagePrivileges[language.code]
                    ? !this.languagePrivileges[language.code].read
                    : true,
            }));
        },
    },
    created() {
        this.language = this.languageOptions
            .find(languageCode => languageCode.code === this.defaultLanguageCode);
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
