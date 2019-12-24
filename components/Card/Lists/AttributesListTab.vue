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
            :selected-option="attributesLanguageCode"
            :is-expanded="isExpanded"
            @searchResult="onSearch"
            @selectOption="onSelect"
            @expand="onExpand" />
        <ListSearchHeader
            v-else
            header="Attributes"
            :is-expanded="isExpanded"
            @searchResult="onSearch"
            @expand="onExpand" />
        <AttributesList :language-code="attributesLanguageCode" />
        <div class="add-fab-btn">
            <Fab
                :disabled="!$hasAccess(['ATTRIBUTE_CREATE'])"
                @click.native="addAttribute">
                <template #icon="{ fillColor }">
                    <IconAdd :fill-color="fillColor" />
                </template>
            </Fab>
        </div>
    </VerticalTabBarListWrapper>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { WHITE } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'AttributesListTab',
    components: {
        VerticalTabBarListWrapper: () => import('~/core/components/Tab/VerticalTabBarListWrapper'),
        AttributesList: () => import('~/components/List/Attributes/AttributesList'),
        ListSearchSelectHeader: () => import('~/core/components/List/ListSearchSelectHeader'),
        ListSearchHeader: () => import('~/core/components/List/ListSearchHeader'),
        Fab: () => import('~/core/components/Buttons/Fab'),
        IconAdd: () => import('~/components/Icon/Actions/IconAdd'),
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
            listDataType: 'attributes',
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
        ...mapState('data', {
            languages: (state) => state.languages,
        }),
        whiteColor() {
            return WHITE;
        },
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
            'getGroups',
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

            Promise.all([
                this.getGroups(this.attributesLanguageCode),
                this.getElements({
                    listType: this.listDataType,
                    languageCode: this.attributesLanguageCode,
                }),
            ]);
        },
        addAttribute() {
            this.$router.push({ name: 'attribute-new-general' });
        },
    },
};
</script>

<style lang="scss" scoped>
    .add-fab-btn {
        position: absolute;
        bottom: 12px;
        right: 12px;
    }
</style>
