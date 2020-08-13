/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributeGroupPage
        :title="code"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'EditAttributeGroup',
    components: {
        AttributeGroupPage: () => import('@Attributes/components/Pages/AttributeGroupPage'),
    },
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store, params,
    }) {
        await store.dispatch('attributeGroup/getAttributeGroup', {
            groupId: params.id,
        });
    },
    computed: {
        ...mapState('attributeGroup', {
            id: state => state.id,
            code: state => state.code,
        }),
        ...mapState('translations', {
            translations: state => state.translations,
        }),
    },
    methods: {
        ...mapActions('attributeGroup', [
            'updateAttributeGroup',
            'removeAttributeGroup',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this group?',
                confirmCallback: () => this.removeAttributeGroup({
                    onSuccess: this.onRemoveSuccess,
                }),
            });
        },
        onSave() {
            this.removeValidationErrors();
            const {
                name,
            } = this.translations;
            const data = {
                name,
            };

            this.updateAttributeGroup({
                id: this.id,
                data,
                onSuccess: this.onUpdateAttributeGroupSuccess,
                onError: this.onError,
            });
        },
        onUpdateAttributeGroupSuccess() {
            this.removeValidationErrors();
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Attribute Group updated',
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Attribute Group removed',
            });
            this.$router.push({
                name: 'attribute-groups-grid',
            });
        },
    },
    head() {
        return {
            title: `${this.code} - Attribute groups - Ergonode`,
        };
    },
};
</script>
