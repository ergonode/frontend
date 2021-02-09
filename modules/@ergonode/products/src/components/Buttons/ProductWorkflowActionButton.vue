/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionButton
        :title="status.name"
        :theme="secondaryTheme"
        :size="smallSize"
        :disabled="!isAllowedToUpdate || !workflow.length"
        :options="workflow"
        :fixed-content="true"
        @input="onUpdateStatus">
        <template #prepend>
            <PointBadge
                :color="status.color"
                :style="badgeStyles" />
        </template>
        <template #option="{ option }">
            <ListElementAction :size="smallSize">
                <PointBadge
                    :color="option.color"
                    :style="optionsBadgeStyles" />
            </ListElementAction>
            <ListElementDescription>
                <ListElementTitle
                    :title="option.name || `#${option.code}`"
                    :size="smallSize" />
            </ListElementDescription>
        </template>
    </ActionButton>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import PRIVILEGES from '@Products/config/privileges';
import ActionButton from '@UI/components/ActionButton/ActionButton';
import PointBadge from '@UI/components/Badges/PointBadge';
import ListElementAction from '@UI/components/List/ListElementAction';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductWorkflowActionButton',
    components: {
        PointBadge,
        ActionButton,
        ListElementAction,
        ListElementDescription,
        ListElementTitle,
    },
    props: {
        languageCode: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState('product', [
            'status',
            'workflow',
        ]),
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
        badgeStyles() {
            return {
                margin: '0 8px 0 4px',
            };
        },
        optionsBadgeStyles() {
            return {
                margin: '0 8px',
            };
        },
    },
    methods: {
        ...mapActions('product', [
            'updateProductStatus',
            'getProductWorkflow',
        ]),
        onUpdateStatus({
            code,
        }) {
            const {
                id: statusId,
            } = this.workflow.find(({
                code: workflowCode,
            }) => code === workflowCode);

            this.$confirm({
                type: MODAL_TYPE.POSITIVE,
                title: this.$t('@Products.product.components.ProductWorkflowActionButton.confirmTitle').replace('[[info]]', code),
                action: () => this.updateProductStatus({
                    value: statusId,
                    languageCode: this.languageCode,
                    attributeId: this.status.attribute_id,
                    onSuccess: () => {
                        const {
                            params: {
                                id,
                            },
                        } = this.$route;

                        this.getProductWorkflow({
                            languageCode: this.languageCode,
                            id,
                        });
                        this.$addAlert({
                            type: ALERT_TYPE.SUCCESS,
                            message: this.$t('@Products.product.components.ProductWorkflowActionButton.alertSuccess'),
                        });
                    },
                }),
            });
        },
    },
};
</script>
