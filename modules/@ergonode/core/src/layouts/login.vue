/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <App>
        <slot />
        <FlashMessages />
    </App>
</template>

<script>
export default {
    name: 'LoginLayout',
    components: {
        App: () => import('@Core/components/Layout/App'),
        FlashMessages: () => import('@Core/components/Alerts/FlashMessages'),
    },
};
</script>
