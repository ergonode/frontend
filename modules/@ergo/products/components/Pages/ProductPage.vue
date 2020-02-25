/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-navigation-back="true"
            :is-read-only="$isReadOnly('PRODUCT')"
            @navigateBack="onDismiss">
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
                    :disabled="!$hasAccess(['PRODUCT_DELETE'])"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete :fill-color="color" />
                    </template>
                </Button>
            </template>
            <template #subActions>
                <TitleBarSubActions>
                    <MenuButton
                        v-if="workflow.length"
                        title="STATUS CHANGE"
                        :theme="secondaryTheme"
                        :size="smallSize"
                        :disabled="!isUserAllowedToUpdateProduct"
                        :options="workflow"
                        @input="onUpdateStatus">
                        <template #option="{ option }">
                            <ListElementAction>
                                <PointBadge :color="option.color" />
                            </ListElementAction>
                            <ListElementDescription>
                                <ListElementTitle
                                    :title="option.name || `#${option.code}`"
                                    :small="true" />
                            </ListElementDescription>
                        </template>
                    </MenuButton>
                </TitleBarSubActions>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
        <Footer v-if="!$route.path.includes('history')">
            <Button
                title="SAVE PRODUCT"
                :size="smallSize"
                :disabled="$isLoading('footerButton')"
                @click.native="onSave" />
        </Footer>
    </Page>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { SIZES, THEMES } from '@Core/defaults/buttons';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';
import Button from '@Core/components/Buttons/Button';
import ProductStatusBadge from '@Products/components/Badges/ProductStatusBadge';
import TitleBarSubActions from '@Core/components/TitleBar/TitleBarSubActions';
import categoryManagementPageBaseMixin from '@Core/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'ProductPage',
    components: {
        Button,
        TitleBarSubActions,
        ProductStatusBadge,
        ListElementDescription: () => import('@Core/components/List/ListElementDescription'),
        ListElementTitle: () => import('@Core/components/List/ListElementTitle'),
        ListElementAction: () => import('@Core/components/List/ListElementAction'),
        MenuButton: () => import('@Core/components/Buttons/MenuButton'),
        PointBadge: () => import('@Core/components/Badges/PointBadge'),
    },
    mixins: [categoryManagementPageBaseMixin],
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('productsDraft', {
            status: state => state.status,
            workflow: state => state.workflow,
        }),
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        isUserAllowedToUpdateProduct() {
            return this.$hasAccess(['PRODUCT_UPDATE']);
        },
    },
    methods: {
        ...mapActions('productsDraft', [
            'updateProductStatus',
            'getProduct',
        ]),
        onUpdateStatus({ code }) {
            const isConfirm = confirm(`Are you sure you want to change status to ${code}?`); /* eslint-disable-line no-restricted-globals */
            if (isConfirm) {
                this.updateProductStatus({
                    value: code,
                    attributeId: this.status.attribute_id,
                    onSuccess: () => {
                        const { params: { id } } = this.$route;
                        this.getProduct({ languageCode: this.userLanguageCode, id });
                        this.$addAlert({ type: 'success', message: 'Status updated' });
                    },
                });
            }
        },
    },
};
</script>
