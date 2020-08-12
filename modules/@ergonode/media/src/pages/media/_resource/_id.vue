/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResourcePage
        :title="`${name}${extension}`"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import ResourcePage from '@Media/components/Pages/ResourcePage';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ResourceEdit',
    components: {
        ResourcePage,
    },
    asyncData({
        store, params,
    }) {
        return store.dispatch('media/getResourceById', params.id);
    },
    computed: {
        ...mapState('media', {
            name: state => state.name,
            extension: state => state.extension,
        }),
    },
    methods: {
        onRemove() {

        },
        onSave() {

        },
    },
};
</script>
