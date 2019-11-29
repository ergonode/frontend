/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BasePage>
        <TitleBar
            :title="title"
            :breadcrumbs="breadcrumbs"
            icon="Document"
            :is-read-only="!isUserAllowedToUpdateProduct && isEdit"
            @navigateback="onDismiss">
            <template #prependBadge>
                <ProductStatusBadge
                    v-if="status"
                    :status="status" />
            </template>
            <template
                v-if="isEdit"
                #mainAction>
                <PrependIconButton
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE PRODUCT"
                    :disabled="!$hasAccess(['PRODUCT_DELETE'])"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete
                            :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
            <template #subActions>
                <TitleBarSubActions>
                    <MultiButton
                        v-if="statusesButtons.more && statusesButtons.more.length"
                        title="more"
                        :theme="secondaryTheme"
                        :size="smallSize"
                        :disabled="!$hasAccess(['PRODUCT_UPDATE'])"
                        :options="optionTitle"
                        @input="optionAction" />
                    <Button
                        v-for="button in statusesButtons.statuses"
                        :key="button.code"
                        :theme="secondaryTheme"
                        :size="smallSize"
                        :title="button.name || button.code"
                        :disabled="!$hasAccess(['PRODUCT_UPDATE'])"
                        @click.native="updateStatus(button.code)" />
                </TitleBarSubActions>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
    </BasePage>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { SIZES, THEMES } from '~/defaults/buttons';
import Button from '~/core/components/Buttons/Button';
import MultiButton from '~/core/components/Buttons/MultiButton';
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'ProductPage',
    mixins: [categoryManagementPageBaseMixin],
    components: {
        Button,
        MultiButton,
        TitleBarSubActions: () => import('~/core/components/TitleBar/TitleBarSubActions'),
        ProductStatusBadge: () => import('~/components/Badges/ProductStatusBadge'),
    },
    created() {
        let generalRoute = { name: 'product-new-general' };
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.breadcrumbs = [
            {
                title: 'Products',
                icon: 'Document',
                route: { name: 'products-grid' },
            },
        ];

        this.isUserAllowedToUpdateProduct = this.$hasAccess(['PRODUCT_UPDATE']);

        if (this.isEdit) {
            const templateRoute = { name: 'product-edit-id-template', params: this.$route.params };
            const commentsRoute = { name: 'product-edit-id-comments', params: this.$route.params };
            const historyRoute = { name: 'product-edit-id-history', params: this.$route.params };
            generalRoute = { name: 'product-edit-id-general', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.tabs = [
                {
                    title: 'General Options',
                    route: generalRoute,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} PRODUCT`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateProduct,
                        },
                    },
                },
                {
                    title: 'Product template',
                    route: templateRoute,
                    active: this.isEdit,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} PRODUCT`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateProduct,
                        },
                    },
                },
                {
                    title: 'Comments',
                    route: commentsRoute,
                    active: this.isEdit,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} PRODUCT`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateProduct,
                        },
                    },
                },
                {
                    title: 'History',
                    route: historyRoute,
                    active: this.isEdit,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} PRODUCT`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateProduct,
                        },
                    },
                },
            ];
        } else {
            this.tabs = [
                {
                    title: 'General Options',
                    route: generalRoute,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} PRODUCT`,
                            action: tabAction,
                            disabled: false,
                        },
                    },
                },
            ];
        }
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('productsDraft', {
            status: (state) => state.status,
            workflow: (state) => state.workflow,
        }),
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        statusesButtons() {
            if (!this.workflow.length) return {};

            const numberOfVisibleStatuses = 2;
            const statuses = JSON.parse(JSON.stringify(this.workflow)); // deep array clone hack
            const visibleStatuses = statuses.splice(0, numberOfVisibleStatuses);
            const hiddenStatuses = statuses.slice(
                -(this.workflow.length - numberOfVisibleStatuses),
            );

            return {
                statuses: visibleStatuses.map((status) => status),
                more: hiddenStatuses.map((status) => status),
            };
        },
        optionTitle() {
            return this.statusesButtons.more.map((option) => option.code);
        },
    },
    methods: {
        ...mapActions('productsDraft', [
            'updateProductStatus',
            'getProduct',
        ]),
        optionAction(value) {
            return this.statusesButtons.more.forEach((option) => {
                if (option.code === value) this.updateStatus(option.code);
            });
        },
        updateStatus(statusCode) {
            const isConfirm = confirm(`Are you sure you want to change status to ${statusCode}?`); /* eslint-disable-line no-restricted-globals */
            if (isConfirm) {
                this.updateProductStatus({
                    value: statusCode,
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
    beforeDestroy() {
        delete this.breadcrumbs;
        delete this.isUserAllowedToUpdateProduct;
    },
};
</script>
