/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <UnitForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import UnitForm from '@Core/components/Forms/UnitForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'UnitBaseTab',
    components: {
        UnitForm,
        ResponsiveCenteredViewTemplate,
    },
};
</script>
