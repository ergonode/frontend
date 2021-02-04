/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NotificationListSection :title="title">
        <template #appendHeader>
            <div class="notification-list-expanding-section-header-actions">
                <NumericBadge number="10" />
                <IconButton
                    :size="tinySize"
                    :theme="secondaryPlainTheme"
                    @click.native="onExpandItem">
                    <template #icon>
                        <IconArrowDouble :state="buttonExpanderIconState" />
                    </template>
                </IconButton>
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
import NumericBadge from '@UI/components/Badges/NumericBadge';
import IconButton from '@UI/components/IconButton/IconButton';
import IconArrowDouble from '@UI/components/Icons/Arrows/IconArrowDouble';

export default {
    name: 'NotificationListExpandingSection',
    components: {
        NotificationListSection,
        IconArrowDouble,
        IconButton,
        NumericBadge,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isExpanded: false,
        };
    },
    computed: {
        tinySize() {
            return SIZE.TINY;
        },
        secondaryPlainTheme() {
            return THEME.SECONDARY_PLAIN;
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
