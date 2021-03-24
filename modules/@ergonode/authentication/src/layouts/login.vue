/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <App>
        <slot />
        <FlashMessages />
    </App>
</template>

<script>
import App from '@UI/components/Layout/App';

export default {
    name: 'LoginLayout',
    components: {
        App,
        FlashMessages: () => import('@Core/components/FlashMessages/FlashMessages'),
    },
};
</script>
