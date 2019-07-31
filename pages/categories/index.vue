/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridPage
        :title="title"
        :action-paths="actionPaths"
        :buttons="buttons"
        icon="Category" />
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'Categories',
    components: {
        GridPage: () => import('~/components/Pages/GridPage'),
    },
    data() {
        return {
            title: 'Categories',
            buttons: [
                {
                    title: 'CREATE CATEGORY',
                    color: 'success',
                    action: this.addNewCategory,
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
                getData: `${this.userLanguageCode}/categories`,
                routerEdit: 'categories-edit-id',
            };
        },
    },
    methods: {
        addNewCategory() {
            this.$router.push('/categories/new');
        },
    },
};
</script>
