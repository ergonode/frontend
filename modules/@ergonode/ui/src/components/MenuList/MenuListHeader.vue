/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslatableTitleProvider :title="title">
        <template #default="{ translatableTitle }">
            <h3
                class="menu-section__title"
                v-text="translatableTitle" />
        </template>
    </TranslatableTitleProvider>
</template>

<script>
import TranslatableTitleProvider from '@Core/components/Translation/TranslatableTitleProvider';

export default {
    name: 'MenuListHeader',
    components: {
        TranslatableTitleProvider,
    },
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
    },
};
</script>
