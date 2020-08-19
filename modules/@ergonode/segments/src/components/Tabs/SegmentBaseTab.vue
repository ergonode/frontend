/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <SegmentForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import SegmentForm from '@Segments/components/Forms/SegmentForm';

export default {
    name: 'SegmentBaseTab',
    components: {
        SegmentForm,
        CenterViewTemplate,
    },
};
</script>
