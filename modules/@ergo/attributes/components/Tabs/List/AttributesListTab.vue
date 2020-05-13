/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarListWrapper>
        <ListSearchTreeSelectHeader
            v-if="isSelectLanguage"
            header="Attributes"
            :options="languageOptions"
            :selected-option="language"
            @searchResult="onSearch"
            @selectOption="onSelect" />
        <ListSearchHeader
            v-else
            header="Attributes"
            @searchResult="onSearch" />
        <List>
            <ListScrollableContainer>
                <AttributesListGroup
                    v-for="(group, index) in groupsWithItems"
                    :key="index"
                    :group="group"
                    :items-count="groupItemsCounts[group.id]"
                    :items="items[group.id][language.code]"
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
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import fetchListGroupDataMixin from '@Core/mixins/list/fetchListGroupDataMixin';

export default {
    name: 'AttributesListTab',
    components: {
        VerticalTabBarListWrapper: () => import('@Core/components/Tab/VerticalTabBarListWrapper'),
        List: () => import('@Core/components/List/List'),
        ListScrollableContainer: () => import('@Core/components/List/ListScrollableContainer'),
        AttributesListGroup: () => import('@Attributes/components/Lists/AttributesListGroup'),
        ListSearchTreeSelectHeader: () => import('@Core/components/List/ListSearchTreeSelectHeader'),
        ListSearchHeader: () => import('@Core/components/List/ListSearchHeader'),
        Fab: () => import('@Core/components/Buttons/Fab'),
        IconAdd: () => import('@Core/components/Icons/Actions/IconAdd'),
        CreateAttributeModalForm: () => import('@Attributes/components/Modals/CreateAttributeModalForm'),
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
        ...mapState('dictionaries', {
            languagesTree: state => state.languagesTree,
        }),
        isUserAllowedToCreateAttribute() {
            return this.$hasAccess(['ATTRIBUTE_CREATE']);
        },
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
        const { languagePrivilegesDefaultCode } = this.user;

        this.language = this.languageOptions
            .find(languegeCode => languegeCode.code === languagePrivilegesDefaultCode);
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
        onSelect(value) {
            this.language = value;

            this.getGroupsAndExpandedGroupItems({
                languageCode: value.code,
            });
        },
    },
};
</script>
