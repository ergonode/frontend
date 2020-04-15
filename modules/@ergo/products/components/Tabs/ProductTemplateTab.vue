/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #header>
            <Select
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
                :language-code="languageCode"
                :elements="elements"
                @valueUpdated="onValueUpdated" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState } from 'vuex';
import { getKeyByValue } from '@Core/models/objectWrapper';
import getProductTemplate from '@Products/services/getProductTemplate.service';
import getProductCompleteness from '@Products/services/getProductCompleteness.service';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import ProductTemplateForm from '@Products/components/Forms/ProductTemplateForm';

export default {
    name: 'ProductTemplateTab',
    components: {
        ResponsiveCenteredViewTemplate,
        ProductTemplateForm,
        Select: () => import('@Core/components/Inputs/Select/Select'),
        ProductCompleteness: () => import('@Products/components/Progress/ProductCompleteness'),
    },
    asyncData({ app: { $axios }, store, params: { id } }) {
        const { language } = store.state.authentication.user;

        return Promise.all([
            getProductTemplate({ $axios, languageCode: language, id }),
            getProductCompleteness({ $axios, languageCode: language, id }),
        ]).then(([templateResponse, completenessResponse]) => ({
            elements: templateResponse.elements,
            completeness: completenessResponse,
        }));
    },
    data() {
        return {
            language: '',
        };
    },
    computed: {
        ...mapState('authentication', {
            user: state => state.user,
        }),
        ...mapState('dictionaries', {
            languages: state => state.languages,
        }),
        ...mapState('product', {
            id: state => state.id,
        }),
        languageCode() {
            return getKeyByValue(this.languages, this.language);
        },
        languageOptions() {
            return Object.values(this.languages);
        },
    },
    created() {
        this.language = this.languages[this.user.language];
    },
    methods: {
        onLanguageChange(value) {
            this.language = value;

            Promise.all([
                getProductTemplate({
                    $axios: this.$axios,
                    languageCode: this.languageCode,
                    id: this.id,
                }),
                getProductCompleteness({
                    $axios: this.$axios,
                    languageCode: this.languageCode,
                    id: this.id,
                }),
            ]).then(([templateResponse, completenessResponse]) => {
                this.elements = templateResponse.elements;
                this.completeness = completenessResponse;
            });
        },
        onValueUpdated() {
            getProductCompleteness({
                $axios: this.$axios,
                languageCode: this.languageCode,
                id: this.id,
            }).then((response) => {
                this.completeness = response;
            });
        },
    },
};
</script>
