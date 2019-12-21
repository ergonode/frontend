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
                        <IconDelete :fill-color="color" />
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
        <Footer v-if="!$route.path.includes('history')">
            <Button
                :title="isEdit ? 'SAVE PRODUCT' : 'CREATE PRODUCT'"
                :loaded="$isLoaded('footerButton')"
                @click.native="onUpdate" />
        </Footer>
    </Page>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { SIZES, THEMES } from '@Core/defaults/buttons';
import { getNestedTabRoutes } from '~/model/navigation/tabs';
import Button from '@Core/components/Buttons/Button';
import MultiButton from '@Core/components/Buttons/MultiButton';
import ProductStatusBadge from '~/components/Badges/ProductStatusBadge';
import TitleBarSubActions from '@Core/components/TitleBar/TitleBarSubActions';
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'ProductPage',
    mixins: [categoryManagementPageBaseMixin],
    components: {
        Button,
        MultiButton,
        ProductStatusBadge,
        TitleBarSubActions,
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('productsDraft', {
            status: (state) => state.status,
            workflow: (state) => state.workflow,
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
};
</script>
