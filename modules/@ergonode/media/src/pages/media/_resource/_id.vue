/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResourcePage
        :title="'RESOURCE'"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import ResourcePage from '@Media/components/Pages/ResourcePage';

export default {
    name: 'ResourceEdit',
    components: {
        ResourcePage,
    },
    methods: {
        onRemove() {

        },
        onSave() {

        },
    },
};
</script>
