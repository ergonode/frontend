/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :theme="secondaryTheme"
        :size="smallSize"
        :title="$t('@Transitions.transition.components.RemoveStatusTransitionButton.title')"
        :disabled="!isAllowedToDelete"
        @click.native="onRemove">
        <template #prepend="{ color }">
            <IconDelete :fill-color="color" />
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
import PRIVILEGES from '@Transitions/config/privileges';
import {
    ROUTE_NAME,
} from '@Transitions/config/routes';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RemoveStatusTransitionButton',
    computed: {
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.delete,
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
        ...mapActions('statusTransition', [
            'removeStatusTransition',
        ]),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('@Transitions.transition.components.RemoveStatusTransitionButton.confirmTitle'),
                applyTitle: this.$t('@Transitions._.deleteConfirm'),
                action: this.onRemoveStatusTransition,
            });
        },
        onRemoveStatusTransition() {
            this.removeStatusTransition({
                onSuccess: this.onRemoveSuccess,
                onError: this.onRemoveError,
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Transitions.transition.components.RemoveStatusTransitionButton.successMessage'),
            });
            this.$router.push({
                name: ROUTE_NAME.STATUS_TRANSITIONS_GRID,
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Transitions.transition.components.RemoveStatusTransitionButton.errorMessage'),
            });
        },
    },
};
</script>
