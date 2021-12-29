/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="delete-attribute-group"
        :theme="secondaryTheme"
        :size="smallSize"
        :title="$t('@AttributeGroups.attributeGroup.components.RemoveAttributeGroupButton.deleteButton')"
        :disabled="!isAllowedToDelete"
        @click.native="onRemove">
        <template #prepend="{ color }">
            <IconDelete :fill-color="color" />
        </template>
    </Button>
</template>

<script>
import PRIVILEGES from '@AttributeGroups/config/privileges';
import {
    ROUTE_NAME,
} from '@AttributeGroups/config/routes';
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
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RemoveAttributeGroupButton',
    computed: {
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE_GROUP.delete,
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
        ...mapActions('attributeGroup', [
            'removeAttributeGroup',
        ]),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('@AttributeGroups.attributeGroup.components.RemoveAttributeGroupButton.deleteTitle'),
                applyTitle: this.$t('@AttributeGroups._.deleteConfirm'),
                cancelTitle: this.$t('@AttributeGroups._.cancel'),
                action: () => this.removeAttributeGroup({
                    onSuccess: this.onRemoveSuccess,
                    onError: this.onRemoveError,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@AttributeGroups.attributeGroup.components.RemoveAttributeGroupButton.deleteSuccess'),
            });
            this.$router.push({
                name: ROUTE_NAME.ATTRIBUTE_GROUPS_GRID,
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@AttributeGroups.attributeGroup.components.RemoveAttributeGroupButton.deleteRequest'),
            });
        },
    },
};
</script>
