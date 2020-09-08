/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <SchedulerForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import SchedulerForm from '@Channels/components/Forms/SchedulerForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ChannelSchedulerTab',
    components: {
        ResponsiveCenteredViewTemplate,
        SchedulerForm,
    },
    async fetch() {
        await this.getSchedulerConfiguration();
    },
    methods: {
        ...mapActions('channel', [
            'getSchedulerConfiguration',
        ]),
    },
};
</script>
