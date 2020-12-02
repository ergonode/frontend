/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarList>
        <ListSearchSelectHeader
            v-if="isSelectLanguage"
            title="Attributes"
            @search-value="onSearch">
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
            title="Attributes"
            searchable
            @search-value="onSearch" />
        <List>
            <Preloader v-if="isPrefetchingData" />
            <ListScrollableContainer v-else>
                <AttributesListGroup
                    v-for="(group, index) in languageGroups"
                    :key="index"
                    :group="group"
                    :items-count="groupItemsCount[group.id]"
                    :items="items[language.code][group.id]"
                    :language-code="language.code"
                    :is-expanded="expandedGroupId === group.id"
                    :is-draggable="!disabled"
                    :is-prefetching-data="prefetchingGroupItemsId === group.id"
                    @expand="onGroupExpand" />
            </ListScrollableContainer>
        </List>
        <Fab
            :floating="{ bottom: '16px', right: '16px' }"
            :disabled="!isAllowedToCreate"
            @click.native="onShowModal">
            <template #icon="{ color }">
                <IconAdd :fill-color="color" />
            </template>
        </Fab>
        <CreateAttributeModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedAttribute" />
    </VerticalTabBarList>
</template>

<script>
import AttributesListGroup from '@Attributes/components/Lists/AttributesListGroup';
import PRIVILEGES from '@Attributes/config/privileges';
import {
    SIZE,
} from '@Core/defaults/theme';
import fetchListGroupDataMixin from '@Core/mixins/list/fetchListGroupDataMixin';
import Fab from '@UI/components/Fab/Fab';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';
import List from '@UI/components/List/List';
import ListScrollableContainer from '@UI/components/List/ListScrollableContainer';
import ListSearchHeader from '@UI/components/List/ListSearchHeader';
import ListSearchSelectHeader from '@UI/components/List/ListSearchSelectHeader';
import Preloader from '@UI/components/Preloader/Preloader';
import TreeSelect from '@UI/components/Select/Tree/TreeSelect';
import VerticalTabBarList from '@UI/components/TabBar/VerticalTabBarList';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributesListTab',
    components: {
        VerticalTabBarList,
        List,
        ListScrollableContainer,
        AttributesListGroup,
        ListSearchSelectHeader,
        ListSearchHeader,
        Fab,
        IconAdd,
        TreeSelect,
        Preloader,
        CreateAttributeModalForm: () => import('@Attributes/components/Modals/CreateAttributeModalForm'),
    },
    mixins: [
        fetchListGroupDataMixin({
            namespace: 'attributes',
        }),
    ],
    props: {
        isSelectLanguage: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isModalVisible: false,
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
        languageGroups() {
            const {
                code,
            } = this.language;

            if (!code || !this.groups[code]) {
                return [];
            }

            return this.groups[code].filter(({
                id,
            }) => this.groupItemsCount[id]);
        },
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.create,
            ]);
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
    beforeDestroy() {
        this.setDisabledElements({});
    },
    methods: {
        ...mapActions('list', [
            'setDisabledElements',
        ]),
        onShowModal() {
            this.isModalVisible = true;
        },
        onCloseModal() {
            this.isModalVisible = false;
        },
        onCreatedAttribute() {
            this.onCloseModal();
            this.fetchListData({
                languageCode: this.language.code,
            });
        },
        onSearch(value) {
            this.codeFilter = value;
            this.getAllGroupsItems({
                languageCode: this.language.code,
            });
        },
        async onSelect(value) {
            const {
                code: languageCode,
            } = value;

            if (typeof this.groups[languageCode] === 'undefined') {
                this.isPrefetchingData = true;

                await this.fetchListData({
                    languageCode,
                    limit: 0,
                });
            }

            if (this.expandedGroupId !== '') {
                await this.getGroupItems({
                    groupId: this.expandedGroupId,
                    languageCode,
                });
            }

            this.language = value;
            this.isPrefetchingData = false;
        },
    },
};
</script>
