/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionButton
        :title="actionButtonTitle"
        :size="smallSize"
        :theme="secondaryTheme"
        :options="options"
        @input="onSelectBulkAction">
        <template #option="{ option }">
            <ListElementDescription>
                <ListElementTitle
                    :title="option.label"
                    :size="smallSize" />
            </ListElementDescription>
        </template>
    </ActionButton>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import ActionButton from '@UI/components/ActionButton/ActionButton';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';

export default {
    name: 'BulkActionButton',
    components: {
        ListElementTitle,
        ListElementDescription,
        ActionButton,
    },
    props: {
        options: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        actionButtonTitle() {
            return 'Actions';
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onSelectBulkAction(option) {
            this.$emit('action', option);
        },
    },
};
</script>
