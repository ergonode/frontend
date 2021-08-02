/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="$t('@Templates.productTemplate._.title')"
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
    </Page>
</template>

<script>
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import CreateProductTemplateButton from '@Templates/components/Buttons/CreateProductTemplateButton';
import ProductTemplatesGrid from '@Templates/components/Grids/ProductTemplatesGrid';
import PRIVILEGES from '@Templates/config/privileges';

export default {
    name: 'Templates',
    components: {
        ProductTemplatesGrid,
        CreateProductTemplateButton,
    },
    mixins: [
        beforeRouteLeaveMixin,
    ],
    computed: {
        extendedMainAction() {
            return this.$getExtendSlot('@Templates/pages/product-templates/mainAction');
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
            title: this.$t('@Templates.productTemplate._.headTitle'),
        };
    },
};
</script>
