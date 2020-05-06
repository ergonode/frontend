/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        title="Add products"
        :api-path="`${languageCode}/products`"
        @close="onClose" />
</template>

<script>
import { mapActions, mapState } from 'vuex';

import ModalGrid from '@Core/components/Modal/ModalGrid';

export default {
    name: 'AddProductsFromListModalGrid',
    components: {
        ModalGrid,
    },
    props: {
    },
    data() {
        return {

        };
    },
    computed: {
        ...mapState('authentication', {
            languageCode: state => state.user.language,
        }),
        ...mapState('collections', {
            id: state => state.id,
        }),

    },
    methods: {
        onClose() {
            this.$emit('close');
        },
    },
};
</script>
