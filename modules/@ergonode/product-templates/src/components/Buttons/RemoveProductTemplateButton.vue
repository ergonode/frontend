/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="delete-template"
        :theme="secondaryTheme"
        :size="smallSize"
        :title="$t('@Templates.productTemplate.components.RemoveProductTemplateButton.title')"
        :disabled="!isAllowedToDelete"
        @click.native="onRemove">
        <template #prepend="{ color }">
            <IconDelete
                :fill-color="color" />
        </template>
    </Button>
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
import PRIVILEGES from '@Templates/config/privileges';
import {
    ROUTE_NAME,
} from '@Templates/config/routes';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RemoveProductTemplateButton',
    computed: {
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.TEMPLATE_DESIGNER.delete,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('productTemplate', [
            'removeTemplate',
        ]),
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Templates.productTemplate.components.RemoveProductTemplateButton.successMessage'),
            });
            this.$router.push({
                name: ROUTE_NAME.PRODUCT_TEMPLATES,
            });
        },
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('@Templates.productTemplate.components.RemoveProductTemplateButton.confirmTitle'),
                applyTitle: this.$t('@Templates._.deleteConfirm'),
                action: () => {
                    this.removeTemplate({
                        scope: this.scope,
                        onSuccess: this.onRemoveSuccess,
                    });
                },
            });
        },
    },
};
</script>
