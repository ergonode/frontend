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
                <UploadResourcesButton />
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs" />
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
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.MULTIMEDIA.namespace);
        },
    },
    head() {
        return {
            title: 'Media - Ergonode',
        };
    },
};
</script>
