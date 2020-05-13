/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #header>
            <TreeSelect
                :style="{ flex: '0 0 192px' }"
                :value="language"
                solid
                small
                label="Edit language"
                :options="languageOptions"
                @input="onLanguageChange" />
            <ProductCompleteness :completeness="completeness" />
        </template>
        <template #centeredContent>
            <ProductTemplateForm
                :language="language"
                :elements="elements"
                @valueUpdated="onValueUpdated" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import getProductTemplate from '@Products/services/getProductTemplate.service';
import getProductCompleteness from '@Products/services/getProductCompleteness.service';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import ProductTemplateForm from '@Products/components/Forms/ProductTemplateForm';

export default {
    name: 'ProductTemplateTab',
    components: {
        ResponsiveCenteredViewTemplate,
        ProductTemplateForm,
        ProductCompleteness: () => import('@Products/components/Progress/ProductCompleteness'),
        TreeSelect: () => import('@Core/components/Inputs/Select/Tree/TreeSelect'),
    },
    asyncData({ app: { $axios }, store, params: { id } }) {
        const { languagePrivilegesDefaultCode } = store.state.authentication.user;

        return Promise.all([
            getProductTemplate({ $axios, languageCode: languagePrivilegesDefaultCode, id }),
            getProductCompleteness({ $axios, languageCode: languagePrivilegesDefaultCode, id }),
        ]).then(([templateResponse, completenessResponse]) => ({
            elements: templateResponse.elements,
            completeness: completenessResponse,
        }));
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
        ...mapState('product', {
            id: state => state.id,
        }),
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
    methods: {
        ...mapActions('product', [
            'getProductDraft',
        ]),
        onLanguageChange(value) {
            const languageCode = value.code;

            Promise.all([
                getProductTemplate({
                    $axios: this.$axios,
                    languageCode,
                    id: this.id,
                }),
                getProductCompleteness({
                    $axios: this.$axios,
                    languageCode,
                    id: this.id,
                }),
                this.getProductDraft({
                    languageCode,
                    id: this.id,
                }),
            ]).then(([templateResponse, completenessResponse]) => {
                this.elements = templateResponse.elements;
                this.completeness = completenessResponse;
                this.language = value;
            });
        },
        onValueUpdated() {
            getProductCompleteness({
                $axios: this.$axios,
                languageCode: this.language.code,
                id: this.id,
            }).then((response) => {
                this.completeness = response;
            });
        },
    },
};
</script>
