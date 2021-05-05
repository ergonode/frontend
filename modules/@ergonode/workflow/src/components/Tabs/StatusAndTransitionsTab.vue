/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <div>
                DESIGNER PLACEHOLDER
            </div>
            <UpdateTransitionsButton />
        </template>
    </CenterViewTemplate>
</template>

<script>
import UpdateTransitionsButton from '@Modules/@ergonode/workflow/src/components/Buttons/UpdateTransitionsButton';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'StatusAndTransitionsTab',
    components: {
        UpdateTransitionsButton,
        CenterViewTemplate,
    },
};
</script>
