/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <ChannelForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import ChannelForm from '@Channels/components/Forms/ChannelForm';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'ChannelBaseTab',
    components: {
        CenterViewTemplate,
        ChannelForm,
    },
};
</script>
