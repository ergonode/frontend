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
            <ProductCompleteness />
        </template>
        <template #centeredContent>
            <ProductTemplateForm :language-code="languageCode" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getKeyByValue } from '@Core/models/objectWrapper';
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
    async fetch({ store, params }) {
        const { id } = params;
        const { language } = store.state.authentication.user;

        await store.dispatch('productsDraft/getDraftForLanguage', { languageCode: language, id });
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
        ...mapState('productsDraft', {
            id: state => state.id,
            completeness: state => state.completeness,
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
        ...mapActions('productsDraft', [
            'getDraftForLanguage',
        ]),
        onLanguageChange(value) {
            this.language = value;
            this.getDraftForLanguage({ languageCode: this.languageCode, id: this.id });
        },
    },
};
</script>
