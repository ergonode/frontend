/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridPage
        title="Imports"
        :route-edit="routeEdit"
        icon="Import" />
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Imports',
    components: {
        GridPage: () => import('~/components/Pages/GridPage'),
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        routeEdit() {
            return {
                getData: `${this.userLanguageCode}/imports`,
                name: 'imports-edit-id',
            };
        },
    },
};
</script>
