/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionButton
        title="STATUS CHANGE"
        :theme="secondaryTheme"
        :size="smallSize"
        :disabled="!isUserAllowedToUpdate"
        :options="workflow"
        :fixed-content="true"
        @input="onUpdateStatus">
        <template #option="{ option }">
            <ListElementAction :size="smallSize">
                <PointBadge :color="option.color" />
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
import ActionButton from '@Core/components/ActionButton/ActionButton';
import PointBadge from '@Core/components/Badges/PointBadge';
import ListElementAction from '@Core/components/List/ListElementAction';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';
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
    computed: {
        ...mapState('product', {
            status: state => state.status,
            workflow: state => state.workflow,
        }),
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    methods: {
        ...mapActions('product', [
            'updateProductStatus',
            'getProductById',
        ]),
        onUpdateStatus({
            code,
        }) {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: `Are you sure you want to change status to ${code}?`,
                confirmCallback: () => this.updateProductStatus({
                    value: code,
                    attributeId: this.status.attribute_id,
                    onSuccess: () => {
                        const {
                            params: {
                                id,
                            },
                        } = this.$route;

                        this.getProductById(id);
                        this.$addAlert({
                            type: ALERT_TYPE.SUCCESS,
                            message: 'Status updated',
                        });
                    },
                }),
            });
        },
    },
};
</script>
