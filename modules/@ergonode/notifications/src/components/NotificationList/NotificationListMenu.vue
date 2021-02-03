/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionIconButton
        :theme="secondaryTheme"
        :size="smallSize"
        :options="items"
        @input="onSelectValue">
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
    </ActionIconButton>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import ActionIconButton from '@UI/components/ActionIconButton/ActionIconButton';
import IconDots from '@UI/components/Icons/Others/IconDots';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'NotificationListMenu',
    components: {
        ActionIconButton,
        IconDots,
        ListElementDescription,
        ListElementTitle,
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        markAllAsRead() {
            return this.$t('@Notifications.notification.components.NotificationListMenu.markAllAsRead');
        },
        items() {
            return [
                {
                    text: this.markAllAsRead,
                    action: this.onMarkAllAssRead,
                },
            ];
        },
    },
    methods: {
        ...mapActions('notification', [
            'markAllNotificationsAsRead',
        ]),
        onMarkAllAssRead() {
            this.markAllNotificationsAsRead();
        },
        onSelectValue(value) {
            value.action();
        },
    },
};
</script>
