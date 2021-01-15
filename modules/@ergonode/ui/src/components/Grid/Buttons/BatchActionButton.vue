/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionButton
        :title="actionButtonTitle"
        :size="smallSize"
        :theme="theme"
        :options="options"
        @input="onSelectBatchAction">
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
    name: 'BatchActionButton',
    components: {
        ListElementTitle,
        ListElementDescription,
        ActionButton,
    },
    props: {
        highlighted: {
            type: Boolean,
            default: false,
        },
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
        theme() {
            return this.highlighted ? THEME.PRIMARY : THEME.SECONDARY;
        },
    },
    methods: {
        onSelectBatchAction(option) {
            this.$emit('action', option);
        },
    },
};
</script>
