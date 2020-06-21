/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <SegmentForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import SegmentForm from '@Segments/components/Forms/SegmentForm';

export default {
    name: 'SegmentBaseTab',
    components: {
        SegmentForm,
        ResponsiveCenteredViewTemplate,
    },
};
</script>
