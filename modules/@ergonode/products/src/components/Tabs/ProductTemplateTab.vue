/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IntersectionObserver @intersect="onIntersect">
        <CenterViewTemplate :fixed="true">
            <template #header>
                <div class="view-template-header__section">
                    <LanguageTreeSelect
                        :style="{ flex: '0 0 192px' }"
                        :label="$t('@Products.product.components.ProductTemplateTab.editLanguageSelectLabel')"
                        :value="languageCode"
                        @input="onSelectLanguage" />
                    <ReadOnlyBadge v-if="isReadOnlyLanguage" />
                </div>
                <div class="view-template-header__section">
                    <ProductCompleteness :language-code="languageCode" />
                    <ProductWorkflowActionButton :language-code="languageCode" />
                    <RestoreProductButton
                        :product-template-scope="scope"
                        :language-code="languageCode"
                        :elements="elements" />
                </div>
            </template>
            <template #centeredContent>
                <Preloader v-if="isFetchingData" />
                <ProductTemplateForm
                    v-else-if="elements.length > 0"
                    :language-code="languageCode"
                    :elements="elements"
                    :scope="scope"
                    :change-values="changeValues"
                    :errors="errors"
                    @input="onValueChange" />
                <TabBarNoDataPlaceholder
                    v-else
                    v-bind="productTemplatePlaceholder">
                    <template #action>
                        <template
                            v-for="(actionItem, index) in extendedPlaceholderActions">
                            <Component
                                :is="actionItem.component"
                                :key="index"
                                v-bind="actionItem" />
                        </template>
                    </template>
                </TabBarNoDataPlaceholder>
            </template>
            <UpdateProductTemplateButton
                :scope="scope"
                :errors="errors"
                :change-values="changeValues"
                :attributes="attributes"
                :language-code="languageCode" />
        </CenterViewTemplate>
    </IntersectionObserver>
</template>

<script>
import LanguageTreeSelect from '@Core/components/Selects/LanguageTreeSelect';
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import ProductWorkflowActionButton from '@Products/components/Buttons/ProductWorkflowActionButton';
import RestoreProductButton from '@Products/components/Buttons/RestoreProductButton';
import UpdateProductTemplateButton from '@Products/components/Buttons/UpdateProductTemplateButton';
import ProductTemplateForm from '@Products/components/Forms/ProductTemplateForm';
import ProductCompleteness from '@Products/components/Progress/ProductCompleteness';
import {
    mapActions,
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateTab',
    components: {
        UpdateProductTemplateButton,
        LanguageTreeSelect,
        RestoreProductButton,
        ProductTemplateForm,
        ProductCompleteness,
        ProductWorkflowActionButton,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    data() {
        return {
            isFetchingData: false,
            languageCode: '',
        };
    },
    computed: {
        ...mapState('authentication', {
            languagePrivileges: state => state.user.languagePrivileges,
        }),
        ...mapGetters('core', [
            'defaultLanguageCode',
        ]),
        ...mapState('product', [
            'id',
            'template',
            'templates',
            'prevTemplate',
            'drafts',
        ]),
        elements() {
            return this.templates[this.languageCode] || [];
        },
        attributes() {
            return this.elements.reduce((prev, curr) => ({
                ...prev,
                [curr.properties.attribute_code]: curr.properties.attribute_id,
            }), {});
        },
        extendedPlaceholderActions() {
            return this.$getExtendSlot('@Products/components/Tabs/ProductTemplateTab/placeholderAction');
        },
        productTemplatePlaceholder() {
            return {
                style: 'margin-top: 24px; align-self: center',
                title: this.$t('@Products.product.components.ProductTemplateTab.placeholderTitle'),
                subtitle: this.$t('@Products.product.components.ProductTemplateTab.placeholderSubtitle'),
            };
        },
        isReadOnlyLanguage() {
            return !this.languagePrivileges[this.languageCode].edit;
        },
    },
    created() {
        this.languageCode = this.defaultLanguageCode;
    },
    methods: {
        ...mapActions('product', [
            '__setState',
            'validateProduct',
            'setDraftValue',
            'getInheritedProduct',
            'getProductTemplate',
            'getProductCollections',
        ]),
        async onIntersect(isIntersecting) {
            if (isIntersecting) {
                if (this.template !== this.prevTemplate) {
                    this.isFetchingData = true;

                    await Promise.all([
                        this.getInheritedProduct({
                            id: this.id,
                            languageCode: this.languageCode,
                        }),
                        this.getProductTemplate({
                            languageCode: this.languageCode,
                        }),
                        this.getProductCollections({
                            languageCode: this.languageCode,
                        }),
                    ]);

                    this.isFetchingData = false;
                }
            }
        },
        async getProductTemplateData(languageCode) {
            const requests = [
                this.getInheritedProduct({
                    id: this.id,
                    languageCode,
                }),
            ];

            if (typeof this.templates[languageCode] === 'undefined') {
                requests.push(
                    this.getProductTemplate({
                        languageCode,
                    }),
                );
            }

            await Promise.all(requests);
        },
        async onSelectLanguage(value) {
            if (value !== this.languageCode) {
                await this.getProductTemplateData(value);

                this.languageCode = value;
            }
        },
        async onValueChange(payload) {
            this.setDraftValue({
                languageCode: payload.languageCode,
                key: payload.code,
                value: payload.value,
            });

            await this.validateProduct({
                ...payload,
                scope: this.scope,
            });
        },
    },
};
</script>
<style lang="scss" scoped>
    .view-template-header__section {
        display: grid;
        align-items: center;
        grid-auto-flow: column;
        grid-column-gap: 24px;
    }
</style>
