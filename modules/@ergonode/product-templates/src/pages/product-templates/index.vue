/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Templates"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <template
                    v-for="(actionItem, index) in extendedMainAction">
                    <Component
                        :is="actionItem.component"
                        :key="index"
                        v-bind="bindingProps(actionItem)" />
                </template>
                <CreateProductTemplateButton />
            </template>
        </TitleBar>
        <CenterViewTemplate>
            <template #content>
                <ProductTemplatesGrid />
            </template>
        </CenterViewTemplate>
        <template
            v-for="(modal, index) in extendedModals">
            <Component
                :is="modal.component"
                :key="index"
                v-bind="bindingProps(modal)" />
        </template>
    </Page>
</template>

<script>
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import CreateProductTemplateButton from '@Templates/components/Buttons/CreateProductTemplateButton';
import ProductTemplatesGrid from '@Templates/components/Grids/ProductTemplatesGrid';
import PRIVILEGES from '@Templates/config/privileges';
import Page from '@UI/components/Layout/Page';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import TitleBar from '@UI/components/TitleBar/TitleBar';

export default {
    name: 'Templates',
    components: {
        ProductTemplatesGrid,
        CreateProductTemplateButton,
        CenterViewTemplate,
        TitleBar,
        Page,
    },
    mixins: [
        beforeRouteLeaveMixin,
    ],
    computed: {
        extendedMainAction() {
            return this.$getExtendSlot('@Templates/pages/product-templates/mainAction');
        },
        extendedModals() {
            return this.$getExtendSlot('@Templates/pages/product-templates/injectModal');
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.TEMPLATE_DESIGNER.namespace);
        },
    },
    methods: {
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.TEMPLATE_DESIGNER,
                ...props,
            };
        },
    },
    head() {
        return {
            title: 'Product templates - Ergonode',
        };
    },
};
</script>
