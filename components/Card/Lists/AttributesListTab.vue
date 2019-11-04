/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab-wrapper">
        <ListSearchSelectHeader
            v-if="isSelectLanguage"
            header="Attributes"
            :options="formattedLanguages"
            :selected-option="attributesLanguageCode"
            @searchResult="onSearch"
            @selectOption="onSelect" />
        <ListSearchHeader
            v-else
            header="Attributes"
            @searchResult="onSearch" />
        <AttributesList :language-code="languageCode" />
        <div class="add-btn-wrapper">
            <FabButton
                :disabled="!$hasAccess('ATTRIBUTE_CREATE')"
                @click.native="addNewAttribute">
                <template #icon="{ color }">
                    <IconAdd :fill-color="color" />
                </template>
            </FabButton>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getValueByKey, getKeyByValue } from '~/model/objectWrapper';
import { WHITE } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'AttributesListTab',
    components: {
        AttributesList: () => import('~/components/List/AttributesList'),
        ListSearchSelectHeader: () => import('~/components/List/ListSearchSelectHeader'),
        ListSearchHeader: () => import('~/components/List/ListSearchHeader'),
        FabButton: () => import('~/components/Buttons/FabButton'),
        IconAdd: () => import('~/components/Icon/Actions/IconAdd'),
    },
    props: {
        isSelectLanguage: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            attributesLanguageCode: null,
        };
    },
    created() {
        this.attributesLanguageCode = getValueByKey(this.languages, this.userLanguageCode);
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
        languageCode() {
            return getKeyByValue(this.languages, this.attributesLanguageCode);
        },
        formattedLanguages() {
            return Object.values(this.languages);
        },
    },
    methods: {
        ...mapActions('list', [
            'setFilter',
            'getGroups',
            'getFilteredGroupElements',
        ]),
        onSearch(value) {
            this.setFilter(value);
            this.getFilteredGroupElements({ listType: 'attributes', languageCode: this.languageCode });
        },
        onSelect(option) {
            this.attributesLanguageCode = option;

            this.getGroups({
                languageCode: this.languageCode,
            });
        },
        addNewAttribute() {
            this.$router.push('/attributes/attribute/new');
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-wrapper {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 275px;

        .add-btn-wrapper {
            position: absolute;
            bottom: 16px;
            right: 16px;
            z-index: 3;
        }
    }
</style>
