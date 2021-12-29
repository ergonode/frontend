/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NotificationListSection :title="title">
        <template #appendHeader>
            <div class="notification-list-expanding-section-header-actions">
                <NumericBadge :number="notificationsCount" />
                <Fab
                    :size="smallSize"
                    :theme="secondaryTheme"
                    @click.native="onExpandItem">
                    <template #icon>
                        <IconArrowDouble :state="buttonExpanderIconState" />
                    </template>
                </Fab>
            </div>
        </template>
        <template #body>
            <slot
                v-if="isExpanded"
                name="body" />
        </template>
    </NotificationListSection>
</template>

<script>

import {
    ARROW,
} from '@Core/defaults/icons';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import NotificationListSection from '@Notifications/components/NotificationList/Section/NotificationListSection';

export default {
    name: 'NotificationListExpandingSection',
    components: {
        NotificationListSection,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
        notificationsCount: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            isExpanded: false,
        };
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        buttonExpanderIconState() {
            return this.isExpanded ? ARROW.DOWN : ARROW.UP;
        },
    },
    methods: {
        onExpandItem() {
            this.isExpanded = !this.isExpanded;
        },
    },
};
</script>

<style lang="scss" scoped>
    .notification-list-expanding-section-header-actions {
        display: grid;
        align-items: center;
        grid-auto-flow: column;
        grid-column-gap: 8px;
    }
</style>
