/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <SchedulerForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import SchedulerForm from '@Channels/components/Forms/SchedulerForm';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ChannelSchedulerTab',
    components: {
        CenterViewTemplate,
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
