/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="$t('@Channels.channel._.title')"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <template
                    v-for="(actionItem, index) in extendedMainAction">
                    <Component
                        :is="actionItem.component"
                        :key="index"
                        v-bind="bindingProps(actionItem)" />
                </template>
                <CreateChannelButton />
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs" />
    </Page>
</template>

<script>
import CreateChannelButton from '@Channels/components/Buttons/CreateChannelButton';
import PRIVILEGES from '@Channels/config/privileges';
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';

export default {
    name: 'Channels',
    components: {
        CreateChannelButton,
    },
    mixins: [
        beforeRouteLeaveMixin,
        asyncTabsMixin,
    ],
    computed: {
        extendedMainAction() {
            return this.$getExtendSlot('@Channels/pages/channels/mainAction');
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.CHANNEL.namespace);
        },
    },
    methods: {
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.CHANNEL,
                ...props,
            };
        },
    },
    head() {
        return {
            title: this.$t('@Channels.channel._.headTitle'),
        };
    },
};
</script>
