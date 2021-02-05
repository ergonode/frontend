/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Media"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <template
                    v-for="(actionItem, index) in extendedMainAction">
                    <Component
                        :is="actionItem.component"
                        :key="index"
                        v-bind="bindingProps(actionItem)" />
                </template>
                <UploadResourcesButton />
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs" />
        <template
            v-for="(modal, index) in extendedModals">
            <Component
                :is="modal.component"
                :key="index"
                v-bind="bindingProps(modal)" />
        </template>
    </Page>
</template>

<script>
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import UploadResourcesButton from '@Media/components/Buttons/UploadResourcesButton';
import PRIVILEGES from '@Media/config/privileges';
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@UI/components/TitleBar/TitleBar';

export default {
    name: 'Media',
    components: {
        UploadResourcesButton,
        TitleBar,
        Page,
        HorizontalRoutingTabBar,
    },
    mixins: [
        beforeRouteLeaveMixin,
        asyncTabsMixin,
    ],
    computed: {
        extendedMainAction() {
            return this.$getExtendSlot('@Media/pages/media/mainAction');
        },
        extendedModals() {
            return this.$getExtendSlot('@Media/pages/media/injectModal');
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.MULTIMEDIA.namespace);
        },
    },
    methods: {
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.MULTIMEDIA,
                ...props,
            };
        },
    },
    head() {
        return {
            title: 'Media - Ergonode',
        };
    },
};
</script>
