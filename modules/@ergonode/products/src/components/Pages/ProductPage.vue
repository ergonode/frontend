/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-read-only="isReadOnly">
            <template #prependHeader>
                <NavigationBackFab />
            </template>
            <template #prependBadge>
                <ProductStatusBadge
                    v-if="status"
                    :status="status" />
            </template>
            <template #mainAction>
                <Button
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE PRODUCT"
                    :disabled="!isUserAllowedToDelete"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete :fill-color="color" />
                    </template>
                </Button>
            </template>
            <template #subActions>
                <TitleBarSubActions>
                    <ProductWorkflowActionButton v-if="workflow.length" />
                </TitleBarSubActions>
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar :items="tabs" />
    </Page>
</template>
<script>
import TitleBarSubActions from '@Core/components/TitleBar/TitleBarSubActions';
import {
    SIZE,
} from '@Core/defaults/theme';
import editPageMixin from '@Core/mixins/page/editPageMixin';
import {
    getNestedTabRoutes,
} from '@Core/models/navigation/tabs';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';
import ProductStatusBadge from '@Products/components/Badges/ProductStatusBadge';
import ProductWorkflowActionButton from '@Products/components/Buttons/ProductWorkflowActionButton';
import PRIVILEGES from '@Products/config/privileges';
import {
    PRODUCT_TYPE,
} from '@Products/defaults';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ProductPage',
    components: {
        TitleBarSubActions,
        ProductStatusBadge,
        ProductWorkflowActionButton,
    },
    mixins: [
        editPageMixin,
    ],
    computed: {
        ...mapState('product', {
            status: state => state.status,
            type: state => state.type,
            workflow: state => state.workflow,
        }),
        ...mapState('dictionaries', {
            productTypes: state => state.productTypes,
        }),
        smallSize() {
            return SIZE.SMALL;
        },
        isUserAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.delete,
            ]);
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.PRODUCT.namespace);
        },
        tabs() {
            const tabs = getNestedTabRoutes(
                this.$hasAccess,
                this.$router.options.routes,
                this.$route,
            );

            switch (getKeyByValue(this.productTypes, this.type)) {
            case PRODUCT_TYPE.WITH_VARIANTS:
                return tabs.filter(tab => tab.title !== 'Group');
            case PRODUCT_TYPE.GROUPING:
                return tabs.filter(tab => tab.title !== 'Variants');
            default: return tabs.filter(tab => tab.title !== 'Variants' && tab.title !== 'Group');
            }
        },
    },
};
</script>
