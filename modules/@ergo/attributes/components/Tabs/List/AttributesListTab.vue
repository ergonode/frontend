/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarListWrapper>
        <ListSearchSelectHeader
            v-if="isSelectLanguage"
            header="Attributes"
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
            header="Attributes"
            @searchResult="onSearch" />
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
                    :is-draggable="isUserAllowedToDragAttributes"
                    @expand="onGroupExpand" />
            </ListScrollableContainer>
        </List>
        <Fab
            :floating="{ bottom: '16px', right: '16px' }"
            :disabled="!isUserAllowedToCreateAttribute"
            @click.native="onShowModal">
            <template #icon="{ color }">
                <IconAdd :fill-color="color" />
            </template>
        </Fab>
        <CreateAttributeModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @create="onCreatedAttribute" />
    </VerticalTabBarListWrapper>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { UNASSIGNED_GROUP_ID } from '@Core/defaults/list';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import fetchListGroupDataMixin from '@Core/mixins/list/fetchListGroupDataMixin';

export default {
    name: 'AttributesListTab',
    components: {
        VerticalTabBarListWrapper: () => import('@Core/components/Tab/VerticalTabBarListWrapper'),
        List: () => import('@Core/components/List/List'),
        ListScrollableContainer: () => import('@Core/components/List/ListScrollableContainer'),
        AttributesListGroup: () => import('@Attributes/components/Lists/AttributesListGroup'),
        ListSearchSelectHeader: () => import('@Core/components/List/ListSearchSelectHeader'),
        ListSearchHeader: () => import('@Core/components/List/ListSearchHeader'),
        Fab: () => import('@Core/components/Buttons/Fab'),
        IconAdd: () => import('@Core/components/Icons/Actions/IconAdd'),
        CreateAttributeModalForm: () => import('@Attributes/components/Modals/CreateAttributeModalForm'),
        TreeSelect: () => import('@Core/components/Inputs/Select/Tree/TreeSelect'),
    },
    mixins: [gridModalMixin, fetchListGroupDataMixin({ namespace: 'attributes' })],
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
        languageGroups() {
            const { code } = this.language;

            if (!code || !this.groups[code]) {
                return [];
            }

            return this.groups[code].filter(({ id }) => this.groupItemsCount[id]);
        },
        isUserAllowedToCreateAttribute() {
            return this.$hasAccess(['ATTRIBUTE_CREATE']);
        },
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
    beforeDestroy() {
        this.setDisabledElements({});
    },
    methods: {
        ...mapActions('list', [
            'setDisabledElements',
        ]),
        onCreatedAttribute() {
            this.onCloseModal();
            this.getGroupsAndExpandedGroupItems({
                languageCode: this.language.code,
            });
        },
        onSearch(value) {
            this.codeFilter = value;
            this.getAllGroupsItems({ languageCode: this.language.code });
        },
        async onSelect(value) {
            const { code: languageCode } = value;

            if (typeof this.groups[languageCode] === 'undefined') {
                await this.getGroups(value.code);
            }

            const requests = [];

            if (!this.groups[languageCode].find(({ id }) => id === UNASSIGNED_GROUP_ID)) {
                requests.push(
                    this.getUnassignedGroupItems(languageCode),
                );
            }

            if (this.expandedGroupId) {
                const {
                    id: groupId,
                } = this.groups[languageCode].find(({ id }) => id === this.expandedGroupId);

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
