/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAttributePage
        :title="title"
        :buttons="getButtons"
        icon="Attributes" />
</template>
<script>
export default {
    name: 'Attributes',
    middleware: ['tab/redirectToAttributeGrid'],
    components: {
        GridAttributePage: () => import('~/components/Pages/GridAttributePage'),
    },
    data() {
        return {
            title: 'Attributes',
        };
    },
    computed: {
        getButtons() {
            const isAttributePath = /grid/.test(this.$route.path);

            if (!isAttributePath) return [];
            return [
                {
                    title: 'CREATE ATTRIBUTE',
                    color: 'success',
                    action: this.addNewAttribute,
                    disabled: !this.$hasAccess('ATTRIBUTE_CREATE'),
                },
            ];
        },
    },
    methods: {
        addNewAttribute() {
            this.$router.push('/attributes/attribute/new');
        },
    },
};
</script>
