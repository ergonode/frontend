/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridPage
        :title="title"
        :action-paths="actionPaths"
        :buttons="buttons"
        icon="Attributes" />
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'Attributes',
    components: {
        GridPage: () => import('~/components/Pages/GridPage'),
    },
    data() {
        return {
            title: 'Attributes',
            buttons: [
                {
                    title: 'CREATE ATTRIBUTE',
                    color: 'success',
                    action: this.addNewAttribute,
                    disabled: !this.$canIUse('ATTRIBUTE_CREATE'),
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
                getData: `${this.userLanguageCode}/attributes`,
                routerEdit: 'attributes-edit-id',
            };
        },
    },
    methods: {
        addNewAttribute() {
            this.$router.push('/attributes/new');
        },
    },
};
</script>
