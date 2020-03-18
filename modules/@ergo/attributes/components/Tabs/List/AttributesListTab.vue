/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarListWrapper>
        <ListSearchSelectHeader
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
                    :items="items[group.id][languageCode]"
                    :language-code="languageCode"
                    :is-expanded="expandedGroupId === group.id"
                    :is-draggable="isUserAllowedToDragAttributes"
                    @expand="onGroupExpand" />
            </ListScrollableContainer>
        </List>
        <template #fab>
            <Fab
                :disabled="!isUserAllowedToCreateAttribute"
                @click.native="onShowModal">
                <template #icon="{ color }">
                    <IconAdd :fill-color="color" />
                </template>
            </Fab>
        </template>
        <CreateAttributeModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedAttribute" />
    </VerticalTabBarListWrapper>
</template>

<script>
import { mapState } from 'vuex';
import { getKeyByValue } from '@Core/models/objectWrapper';
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
            language: '',
        };
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('dictionaries', {
            languages: state => state.languages,
        }),
        languageCode() {
            return getKeyByValue(this.languages, this.language);
        },
        isUserAllowedToCreateAttribute() {
            return this.$hasAccess(['ATTRIBUTE_CREATE']);
        },
        isUserAllowedToDragAttributes() {
            return this.$hasAccess(['ATTRIBUTE_UPDATE']);
        },
        languageOptions() {
            return Object.values(this.languages);
        },
    },
    created() {
        this.language = this.languages[this.userLanguageCode];
    },
    methods: {
        onCreatedAttribute() {
            this.onCloseModal();
            this.getGroupsAndExpandedGroupItems({
                languageCode: this.languageCode,
            });
        },
        onSearch(value) {
            this.codeFilter = value;
            this.getAllGroupsItems({ languageCode: this.languageCode });
        },
        onSelect(value) {
            this.language = value;

            this.getGroupsAndExpandedGroupItems({
                languageCode: this.languageCode,
            });
        },
    },
};
</script>
