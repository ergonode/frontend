/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributeGroupPage
        :title="code"
        @dismiss="onDismiss"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { isThereAnyTranslation, getParsedTranslations } from '@Core/models/mappers/translationsMapper';
import { getParentRoutePath } from '@Core/models/navigation/tabs';
import { ALERT_TYPE } from '@Core/defaults/alerts';

export default {
    name: 'EditAttributeGroup',
    components: {
        AttributeGroupPage: () => import('@Attributes/components/Pages/AttributeGroupPage'),
    },
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({ store, params }) {
        await store.dispatch('attributeGroup/getAttributeGroupById', {
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
        onDismiss() {
            this.$router.push(getParentRoutePath(this.$route));
        },
        onRemove() {
            const isConfirm = confirm('Are you sure you want to delete this group?'); /* eslint-disable-line no-restricted-globals */
            if (isConfirm) {
                this.removeAttributeGroup({
                    onSuccess: this.onRemoveSuccess,
                });
            }
        },
        onSave() {
            this.removeValidationErrors();
            let { name } = this.translations;
            if (isThereAnyTranslation(name)) {
                name = getParsedTranslations(name);
            }
            this.updateAttributeGroup({
                id: this.id,
                data: { name },
                onSuccess: this.onUpdateAttributeGroupSuccess,
                onError: this.onError,
            });
        },
        onUpdateAttributeGroupSuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Attribute Group updated' });
        },
        onRemoveSuccess() {
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Attribute Group removed' });
            this.$router.push({ name: 'attribute-groups-grid' });
        },
    },
    head() {
        return {
            title: `${this.code} - Attribute groups - Ergonode`,
        };
    },
};
</script>
