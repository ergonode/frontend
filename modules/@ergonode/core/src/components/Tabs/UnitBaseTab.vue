/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <UnitForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import UnitForm from '@Core/components/Forms/UnitForm';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'UnitBaseTab',
    components: {
        UnitForm,
        CenterViewTemplate,
    },
};
</script>
