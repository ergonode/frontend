/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributeGroupPage
        title="New Group"
        @dismiss="onDismiss"
        @create="onCreate" />
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
    name: 'NewGroup',
    middleware: ['tab/redirectToAttributeGroupGeneral'],
    components: {
        AttributeGroupPage: () => import('~/components/Pages/AttributeGroupPage'),
    },
    computed: {
        ...mapState('attributeGroup', {
            code: (state) => state.code,
        }),
    },
    created() {
        this.clearStorage();
    },
    methods: {
        ...mapActions('attributeGroup', [
            'createAttributeGroup',
            'clearStorage',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push('/attributes/groups');
        },
        onAttributeGroupCreated(id) {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Attribute group created' });
            this.$router.push({
                name: 'attribute-group-edit-id',
                params: {
                    id,
                },
            });
        },
        onCreate() {
            this.removeValidationErrors();

            this.createAttributeGroup({
                data: {
                    code: this.code,
                },
                onSuccess: this.onAttributeGroupCreated,
                onError: this.onError,
            });
        },
    },
};
</script>
