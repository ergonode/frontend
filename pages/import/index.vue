/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridPage
        :title="title"
        :action-paths="actionPaths"
        :buttons="buttons"
        icon="Import" />
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Imports',
    components: {
        GridPage: () => import('~/components/Pages/GridPage'),
    },
    data() {
        return {
            title: 'Imports',
            buttons: [
                {
                    title: 'CREATE IMPORT',
                    color: 'success',
                    action: this.addNewImport,
                    disabled: !this.$canIUse('IMPORT_CREATE'),
                },
            ],
        };
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        actionPaths() {
            return {
                getData: `${this.userLanguageCode}/imports`,
                routerEdit: 'imports-edit-id',
            };
        },
    },
    methods: {
        addNewImport() {
            // TODO: Imports will have add / edit
            // this.$router.push('/imports/new');
        },
    },
};
</script>
