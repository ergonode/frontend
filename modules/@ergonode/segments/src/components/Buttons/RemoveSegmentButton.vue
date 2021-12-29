/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="delete-segment"
        :theme="secondaryTheme"
        :size="smallSize"
        :title="$t('@Segments.segment.components.RemoveSegmentButton.title')"
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
import PRIVILEGES from '@Segments/config/privileges';
import {
    ROUTE_NAME,
} from '@Segments/config/routes';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RemoveSegmentButton',
    computed: {
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.SEGMENT.delete,
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
        ...mapActions('segment', [
            'removeSegment',
        ]),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('@Segments.segment.components.RemoveSegmentButton.confirmTitle'),
                applyTitle: this.$t('@Segments._.deleteConfirm'),
                action: () => this.removeSegment({
                    onSuccess: this.onRemoveSuccess,
                    onError: this.onRemoveError,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Segments.segment.components.RemoveSegmentButton.successMessage'),
            });
            this.$router.push({
                name: ROUTE_NAME.SEGMENTS_GRID,
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Segments.segment.components.RemoveSegmentButton.errorMessage'),
            });
        },
    },
};
</script>
