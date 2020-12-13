/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Templates"
            :is-read-only="isReadOnly">
            <template #mainAction>
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
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.TEMPLATE_DESIGNER.namespace);
        },
    },
    head() {
        return {
            title: 'Product templates - Ergonode',
        };
    },
};
</script>
