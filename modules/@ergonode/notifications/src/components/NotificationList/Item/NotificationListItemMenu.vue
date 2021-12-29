/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="notification-list-item-menu">
        <ActionFab
            :theme="secondaryPlainTheme"
            :size="smallSize"
            :options="items"
            @input="onSelectValue"
            @focus="onSelectFocus">
            <template #icon="{ color }">
                <IconDots :fill-color="color" />
            </template>
            <template #option="{ option }">
                <ListElementDescription>
                    <ListElementTitle
                        :size="smallSize"
                        :title="option.text" />
                </ListElementDescription>
            </template>
        </ActionFab>
    </div>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'NotificationListItemMenu',
    props: {
        items: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryPlainTheme() {
            return THEME.SECONDARY_PLAIN;
        },
    },
    methods: {
        onSelectValue(value) {
            this.$emit('input', value);
        },
        onSelectFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
    },
};
</script>

<style lang="scss" scoped>
    .notification-list-item-menu {
        position: absolute;
        top: 12px;
        right: 16px;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;
        border-radius: 18px;
    }
</style>
