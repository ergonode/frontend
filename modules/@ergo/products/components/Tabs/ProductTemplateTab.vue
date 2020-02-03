/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #header>
            <div class="product-template-header">
                <div class="product-template-header__language-selection">
                    <Select
                        :value="language"
                        solid
                        regular
                        label="Edit language"
                        :options="languageOptions"
                        @input="onLanguageChange" />
                </div>
                <ProductCompleteness :language="language" />
            </div>
        </template>
        <template #content>
            <VerticalFixedScroll>
                <div class="container">
                    <VerticalCenteredView>
                        <ProductTemplateForm :language-code="languageCode" />
                    </VerticalCenteredView>
                </div>
            </VerticalFixedScroll>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getKeyByValue } from '@Core/models/objectWrapper';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import VerticalFixedScroll from '@Core/components/Layout/Scroll/VerticalFixedScroll';
import VerticalCenteredView from '@Core/components/Layout/VerticalCenteredView';
import ProductTemplateForm from '@Products/components/Forms/ProductTemplateForm';

export default {
    name: 'ProductTemplateTab',
    components: {
        VerticalCenteredView,
        VerticalFixedScroll,
        ResponsiveCenteredViewTemplate,
        ProductTemplateForm,
        Select: () => import('@Core/components/Inputs/Select/Select'),
        ProductCompleteness: () => import('@Products/components/Progress/ProductCompleteness'),
    },
    data() {
        return {
            language: '',
        };
    },
    created() {
        this.language = this.languages[this.user.language];
    },
    computed: {
        ...mapState('authentication', {
            user: (state) => state.user,
        }),
        ...mapState('dictionaries', {
            languages: (state) => state.languages,
        }),
        ...mapState('productsDraft', {
            id: (state) => state.id,
            completeness: (state) => state.completeness,
        }),
        languageCode() {
            return getKeyByValue(this.languages, this.language);
        },
        languageOptions() {
            return Object.values(this.languages);
        },
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
    async fetch({ store, params }) {
        const { id } = params;
        const { language } = store.state.authentication.user;

        await store.dispatch('productsDraft/getDraftForLanguage', { languageCode: language, id });
    },
};
</script>

<style lang="scss" scoped>
    .product-template-header {
        display: flex;
        flex: 1 1 auto;
        justify-content: space-between;
        align-items: center;
        min-height: 55px;

        &__language-selection {
            flex: 0 0 196px;
        }
    }

    .template-grid {
        width: 1008px;
        padding: 24px;
    }

    .container {
        display: grid;
    }
</style>
