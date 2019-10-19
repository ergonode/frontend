/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            :title="title"
            :buttons="buttons"
            :breadcrumbs="breadcrumbs"
            icon="Document"
            :is-read-only="!isUserAllowedToUpdateProduct && isEdit"
            @navigateback="onDismiss" />
        <HorizontalTabBar :items="tabs" />
    </PageWrapper>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'ProductPage',
    mixins: [categoryManagementPageBaseMixin],
    created() {
        let generalRoute = { name: 'product-new-general' };
        let templateRoute = { name: 'product-new-template' };
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.breadcrumbs = [
            {
                title: 'Products',
                icon: 'Document',
                route: { name: 'products-grid' },
            },
        ];

        this.isUserAllowedToUpdateProduct = this.$hasAccess('PRODUCT_UPDATE');

        if (this.isEdit) {
            generalRoute = { name: 'product-edit-id-general', params: this.$route.params };
            templateRoute = { name: 'product-edit-id-template', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.buttons = [
                {
                    title: 'REMOVE PRODUCT',
                    action: this.onRemove,
                    theme: 'secondary',
                    disabled: !this.$hasAccess('PRODUCT_DELETE'),
                    prepend: {
                        component: () => import('~/components/Icon/Actions/IconDelete'),
                    },
                },
                ...this.getButtonsForStatuses,
                this.getActiveStatus,
            ];
        }

        this.tabs = [
            {
                title: 'General options',
                route: generalRoute,
                active: true,
                props: {
                    updateButton: {
                        title: `${buttonPrefix} PRODUCT`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateProduct : false,
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
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateProduct : false,
                    },
                },
            },
        ];
    },
    computed: {
        ...mapState('productsDraft', {
            producId: (state) => state.id,
            status: (state) => state.status,
            workflow: (state) => state.workflow,
        }),
        getActiveStatus() {
            return {
                title: this.status.code,
                theme: 'secondary',
                inactive: true,
                disabled: !this.$hasAccess('PRODUCT_UPDATE'),
                prepend: {
                    color: this.status.color,
                    component: () => import('~/components/Badges/StatusBadge'),
                },
            };
        },
        getButtonsForStatuses() {
            if (!this.workflow.length) return [];
            const moreStatuses = JSON.parse(JSON.stringify(this.workflow)); // deep array clone hack
            const statuses = moreStatuses.splice(0, 2);
            const statusesButtons = statuses.map((current) => ({
                title: current.code,
                theme: 'secondary',
                action: this.updateStatus.bind(this, current.code),
                disabled: !this.$hasAccess('PRODUCT_UPDATE'),
            }));

            if (moreStatuses.length) {
                return [
                    {
                        title: 'more',
                        theme: 'secondary',
                        disabled: !this.$hasAccess('PRODUCT_UPDATE'),
                        append: {
                            component: () => import('~/components/Icon/Arrows/IconArrowDropDown'),
                        },
                        options: [
                            ...moreStatuses.map((current) => ({
                                title: current.code,
                                action: this.updateStatus.bind(this, current.code),
                            })),
                        ],
                    },
                    ...statusesButtons,
                ];
            }
            return [
                ...statusesButtons,
            ];
        },
    },
    methods: {
        ...mapActions('productsDraft', [
            'updateProductStatus',
        ]),
        updateStatus(value = null) {
            const isConfirm = confirm(`Are you sure you want to change status to ${value}?`); /* eslint-disable-line no-restricted-globals */
            if (isConfirm) {
                this.updateProductStatus({
                    value,
                    attributeId: this.status.attribute_id,
                    onSuccess: () => {
                        this.$addAlert({ type: 'success', message: 'Status updated' });
                        // this.$router.push({ name: 'product-edit-id-general', params: { id: this.producId } });
                        window.location.reload(true);
                    },
                });
            }
        },
    },
    beforeDestroy() {
        delete this.breadcrumbs;
        delete this.isUserAllowedToUpdateProduct;
        delete this.buttons;
    },
};
</script>
