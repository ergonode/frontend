/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarList>
        <ListSearchSelectHeader
            v-if="isSelectLanguage"
            header="System attributes"
            @searchResult="onSearch">
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
            header="System attributes"
            @searchResult="onSearch" />
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
import TreeSelect from '@Core/components/Inputs/Select/Tree/TreeSelect';
import List from '@Core/components/List/List';
import ListScrollableContainer from '@Core/components/List/ListScrollableContainer';
import ListSearchHeader from '@Core/components/List/ListSearchHeader';
import ListSearchSelectHeader from '@Core/components/List/ListSearchSelectHeader';
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
        ...mapState('core', {
            defaultLanguageCode: state => state.defaultLanguageCode,
            languagesTree: state => state.languagesTree,
        }),
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
                disabled: !this.languagePrivileges[language.code].read,
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
