/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DefaultLayout>
        <nuxt />
    </DefaultLayout>
</template>

<script>
import { isEmpty } from '@Core/models/objectWrapper';

export default {
    name: 'NuxtDefaultLayout',
    middleware({ store, redirect }) {
        const { data, authentication } = store.state;
        let emptyState = 0;

        if (!(authentication.jwt && authentication.user)) {
            return redirect('/');
        }

        Object.values(data).forEach((value) => {
            if (Array.isArray(value) && value.length === 0) {
                emptyState += 1;
            }
            if (!Array.isArray(value) && isEmpty(value)) {
                emptyState += 1;
            }
        });
        if (emptyState > 0) {
            return store.dispatch('data/getDictionaries');
        }

        return null;
    },
    components: {
        DefaultLayout: () => import('@Core/layouts/default'),
    },
};
</script>
