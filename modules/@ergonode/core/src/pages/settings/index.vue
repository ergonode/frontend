/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="$t('@Core.core._.settingsTitle')"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <template
                    v-for="(actionItem, index) in extendedMainAction">
                    <Component
                        :is="actionItem.component"
                        :key="index"
                        v-bind="bindingProps(actionItem)" />
                </template>
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs"
            :change-values="changeValues"
            :errors="errors" />
    </Page>
</template>

<script>
import PRIVILEGES from '@Core/config/privileges';
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import {
    mapState,
} from 'vuex';

export default {
    name: 'Settings',
    mixins: [
        beforeRouteLeaveMixin,
        asyncTabsMixin,
    ],
    computed: {
        ...mapState('feedback', [
            'changeValues',
            'errors',
        ]),
        extendedMainAction() {
            return this.$getExtendSlot('@Core/pages/settings/mainAction');
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.SETTINGS.namespace);
        },
    },
    methods: {
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.SETTINGS,
                ...props,
            };
        },
    },
    head() {
        return {
            title: 'Settings - Ergonode',
        };
    },
};
</script>
