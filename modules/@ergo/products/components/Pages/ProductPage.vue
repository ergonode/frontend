/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
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
                    <ActionButton
                        v-if="workflow.length"
                        title="STATUS CHANGE"
                        :theme="secondaryTheme"
                        :size="smallSize"
                        :disabled="!isUserAllowedToUpdateProduct"
                        :options="workflow"
                        :fixed-content="true"
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
                    </ActionButton>
                </TitleBarSubActions>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
        <Footer
            v-if="!$route.path.includes('history')"
            flex-end>
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
import { SIZE, THEME } from '@Core/defaults/theme';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';
import { ALERT_TYPE } from '@Core/defaults/alerts';
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
        ActionButton: () => import('@Core/components/Buttons/ActionButton'),
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
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
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
                        this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Status updated' });
                    },
                });
            }
        },
    },
};
</script>
