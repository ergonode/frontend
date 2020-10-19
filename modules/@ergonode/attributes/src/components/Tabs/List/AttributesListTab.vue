/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarList>
        <ListSearchSelectHeader
            v-if="isSelectLanguage"
            title="Attributes"
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
            title="Attributes"
            @search-result="onSearch" />
        <List>
            <ListScrollableContainer>
                <AttributesListGroup
                    v-for="(group, index) in languageGroups"
                    :key="index"
                    :group="group"
                    :items-count="groupItemsCount[group.id]"
                    :items="items[language.code][group.id]"
                    :language-code="language.code"
                    :is-expanded="expandedGroupId === group.id"
                    :is-draggable="!disabled"
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
import Fab from '@Core/components/Fab/Fab';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import List from '@Core/components/List/List';
import ListScrollableContainer from '@Core/components/List/ListScrollableContainer';
import ListSearchHeader from '@Core/components/List/ListSearchHeader';
import ListSearchSelectHeader from '@Core/components/List/ListSearchSelectHeader';
import TreeSelect from '@Core/components/Select/Tree/TreeSelect';
import VerticalTabBarList from '@Core/components/TabBar/VerticalTabBarList';
import {
    UNASSIGNED_GROUP_ID,
} from '@Core/defaults/list';
import {
    SIZE,
} from '@Core/defaults/theme';
import fetchListGroupDataMixin from '@Core/mixins/list/fetchListGroupDataMixin';
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
            this.fetchListData(this.language.code);
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
                await this.getGroups(value.code);
            }

            const requests = [];

            if (!this.groups[languageCode].find(({
                id,
            }) => id === UNASSIGNED_GROUP_ID)) {
                requests.push(
                    this.getUnassignedGroupItems(languageCode),
                );
            }

            if (this.expandedGroupId) {
                const {
                    id: groupId,
                } = this.groups[languageCode].find(({
                    id,
                }) => id === this.expandedGroupId);

                requests.push(
                    this.getGroupItems({
                        groupId,
                        languageCode,
                    }),
                );
            }

            await Promise.all(requests);

            this.language = value;
        },
    },
};
</script>
