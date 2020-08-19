/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <TransitionForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import TransitionForm from '@Transitions/components/Forms/TransitionForm';

export default {
    name: 'TransitionBaseTab',
    components: {
        TransitionForm,
        CenterViewTemplate,
    },
};
</script>
