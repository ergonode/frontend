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
    components: {
        DefaultLayout: () => import('@Core/layouts/default'),
    },
    async middleware({ store, redirect }) {
        const { dictionaries, authentication } = store.state;
        let emptyState = 0;

        if (!authentication.isLogged) {
            redirect('/');
        }

        Object.values(dictionaries).forEach((value) => {
            if (Array.isArray(value) && value.length === 0) {
                emptyState += 1;
            }
            if (!Array.isArray(value) && isEmpty(value)) {
                emptyState += 1;
            }
        });
        if (emptyState > 0) {
            await store.dispatch('dictionaries/getDictionaries');
            if (dictionaries.languagesTree && authentication.user) {
                const defaultLanguage = Object
                    .keys(dictionaries.languagesTree)
                    .find(code => dictionaries.languagesTree[code].privileges.read === true);
                await store.dispatch('core/setDefaultLanguage', defaultLanguage);
            }
        }
    },
};
</script>
