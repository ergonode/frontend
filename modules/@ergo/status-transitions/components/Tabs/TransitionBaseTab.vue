/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <TransitionForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import TransitionForm from '@Transitions/components/Forms/TransitionForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'TransitionBaseTab',
    components: {
        TransitionForm,
        ResponsiveCenteredViewTemplate,
    },
};
</script>
