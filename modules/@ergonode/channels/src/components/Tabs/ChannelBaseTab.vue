/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <ChannelForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ChannelForm from '@Channels/components/Forms/ChannelForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'ChannelBaseTab',
    components: {
        ResponsiveCenteredViewTemplate,
        ChannelForm,
    },
};
</script>
