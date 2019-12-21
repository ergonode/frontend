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
                        :value="languageCode"
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
                <VerticalCenteredView>
                    <ProductTemplateForm :language-code="languageCode" />
                </VerticalCenteredView>
            </VerticalFixedScroll>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getValueByKey } from '~/model/objectWrapper';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import VerticalFixedScroll from '@Core/components/Layout/Scroll/VerticalFixedScroll';
import VerticalCenteredView from '@Core/components/Layout/VerticalCenteredView';

export default {
    name: 'ProductTemplateTab',
    components: {
        VerticalCenteredView,
        VerticalFixedScroll,
        ResponsiveCenteredViewTemplate,
        Select: () => import('@Core/components/Inputs/Select/Select'),
        ProductCompleteness: () => import('~/components/Progress/ProductCompleteness'),
        ProductTemplateForm: () => import('~/components/Forms/ProductTemplateForm'),
    },
    data() {
        return {
            language: '',
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
        languageOptions() {
            return Object.keys(this.languages).map((language) => ({
                id: language,
                name: this.languages[language],
            }));
        },
    },
    methods: {
        ...mapActions('productsDraft', [
            'setDraftLanguageCode',
        ]),
        onLanguageChange(value) {
            this.language = getValueByKey(this.languages, value);

            this.setDraftLanguageCode(value);
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
        width: 1008px;
        padding: 24px;
    }
</style>
