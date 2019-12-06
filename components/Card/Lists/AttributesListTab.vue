/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab-wrapper">
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
        <div class="add-btn-wrapper">
            <FabButton
                :disabled="!$hasAccess(['ATTRIBUTE_CREATE'])"
                @click.native="addAttribute">
                <template #icon="{ color }">
                    <IconAdd :fill-color="color" />
                </template>
            </FabButton>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { WHITE } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'AttributesListTab',
    components: {
        AttributesList: () => import('~/components/List/Attributes/AttributesList'),
        ListSearchSelectHeader: () => import('~/core/components/List/ListSearchSelectHeader'),
        ListSearchHeader: () => import('~/core/components/List/ListSearchHeader'),
        FabButton: () => import('~/core/components/Buttons/FabButton'),
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
            return Object.keys(this.languages).map(
                (language) => ({ code: language, name: this.languages[language] }),
            );
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
            this.getElements({ listType: 'attributes', languageCode: this.attributesLanguageCode });
        },
        onSelect(option) {
            this.attributesLanguageCode = option;

            Promise.all([
                this.getGroups(this.attributesLanguageCode),
                this.getElements({ listType: 'attributes', languageCode: this.attributesLanguageCode }),
            ]);
        },
        addAttribute() {
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
            bottom: 12px;
            right: 12px;
            z-index: 3;
        }
    }
</style>
