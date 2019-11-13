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
                        :options="languagesValues"
                        @input="onLanguageChange" />
                </div>
                <ProductCompleteness :language="language" />
            </div>
        </template>
        <template #content>
            <BaseForm>
                <ProductTemplateCard :language-code="languageCode" />
            </BaseForm>
        </template>
        <template #footer>
            <Footer :button="updateButton" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getKeyByValue, getValueByKey } from '~/model/objectWrapper';
import Footer from '~/components/ReusableFooter/Footer';
import ResponsiveCenteredViewTemplate from '~/components/Layout/ResponsiveCenteredViewTemplate';
import BaseForm from '~/components/Form/BaseForm';

export default {
    name: 'ProductTemplateTab',
    components: {
        ResponsiveCenteredViewTemplate,
        Select: () => import('~/components/Inputs/Select/Select'),
        ProductCompleteness: () => import('~/components/Progress/ProductCompleteness'),
        ProductTemplateCard: () => import('~/components/Card/Cards/ProductTemplateCard'),
        Footer,
        BaseForm,
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            language: '',
            buttons: [
                {
                    title: 'SAVE CHANGES',
                    action: this.updateButton.action,
                    disabled: !this.$hasAccess('PRODUCT_UPDATE'),
                },
            ],
        };
    },
    mounted() {
        this.language = getValueByKey(this.languages, this.languageCode);

        this.setDraftLanguageCode(this.languageCode);
    },
    computed: {
        ...mapState('authentication', {
            user: (state) => state.user,
        }),
        ...mapState('data', {
            languages: (state) => state.languages,
        }),
        ...mapState('productsDraft', {
            languageCode: (state) => state.languageCode,
            completeness: (state) => state.completeness,
        }),
        languagesValues() {
            return Object.values(this.languages);
        },
    },
    methods: {
        ...mapActions('productsDraft', [
            'setDraftLanguageCode',
        ]),
        onLanguageChange(value) {
            this.language = value;

            this.setDraftLanguageCode(getKeyByValue(this.languages, value));
        },
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
        max-width: 960px;
        padding: 24px;
    }
</style>
