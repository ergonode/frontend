/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab-wrapper">
        <ListSearchSelectHeader
            v-if="isSelectLanguage"
            header="System Attributes"
            :options="languageOptions"
            :selected-option="attributesLanguageCode"
            :is-expanded="isExpanded"
            @searchResult="onSearch"
            @selectOption="onSelect"
            @expand="onExpand" />
        <ListSearchHeader
            v-else
            header="System Attributes"
            :is-expanded="isExpanded"
            @searchResult="onSearch"
            @expand="onExpand" />
        <SystemAttributesList :language-code="attributesLanguageCode" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'SystemAttributesListTab',
    components: {
        SystemAttributesList: () => import('~/components/List/Attributes/SystemAttributesList'),
        ListSearchSelectHeader: () => import('~/core/components/List/ListSearchSelectHeader'),
        ListSearchHeader: () => import('~/core/components/List/ListSearchHeader'),
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
            listDataType: 'attributes/system',
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
            this.getElements({
                listType: this.listDataType,
                languageCode: option,
            });
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
        }
    }
</style>
