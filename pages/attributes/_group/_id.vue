/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributeGroupPage
        :title="code"
        is-edit
        @dismiss="onDismiss"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { isThereAnyTranslation, getParsedTranslations } from '~/model/mappers/translationsMapper';

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'EditAttributeGroup',
    middleware: ['tab/redirectToAttributeGroupGeneral'],
    components: {
        AttributeGroupPage: () => import('~/components/Pages/AttributeGroupPage'),
    },
    computed: {
        ...mapState('attributeGroup', {
            id: (state) => state.id,
            code: (state) => state.code,
        }),
        ...mapState('translations', {
            translations: (state) => state.translations,
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
            this.$router.push('/attributes/groups');
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
            this.$addAlert({ type: 'success', message: 'Attribute Group updated' });
            this.$router.push('/attributes/groups');
        },
        onRemoveSuccess() {
            this.$addAlert({ type: 'success', message: 'Attribute Group removed' });
            this.$router.push('/attributes/groups');
        },
    },
    async fetch({
        store,
        params,
    }) {
        await Promise.all([
            store.dispatch('translations/clearStorage'),
            store.dispatch('attributeGroup/clearStorage'),
        ]);
        await store.dispatch('attributeGroup/getAttributeGroupById', {
            groupId: params.id,
        });
    },
};
</script>
