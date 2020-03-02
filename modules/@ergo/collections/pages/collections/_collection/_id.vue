/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CollectionPage
        :title="code"
        @dismiss="onDismiss"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { isThereAnyTranslation, getParsedTranslations } from '@Core/models/mappers/translationsMapper';
import { getParentRoutePath } from '@Core/models/navigation/tabs';

export default {
    name: 'EditCollection',
    components: {
        CollectionPage: () => import('@Collections/components/Pages/CollectionPage'),
    },
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({ store, params }) {
        await store.dispatch('collections/getCollectionTypes');
        await store.dispatch('collections/getCollectionById', {
            collectionId: params.id,
        });
    },
    computed: {
        ...mapState('collections', {
            id: state => state.id,
            code: state => state.code,
            type: state => state.type,
        }),
        ...mapState('translations', {
            translations: state => state.translations,
        }),
    },
    methods: {
        ...mapActions('collections', [
            'updateCollection',
            'removeCollection',
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
                this.removeCollection({
                    onSuccess: this.onRemoveSuccess,
                });
            }
        },
        onSave() {
            this.removeValidationErrors();
            const { description } = this.translations;
            let { name } = this.translations;
            if (isThereAnyTranslation(name)) {
                name = getParsedTranslations(name);
            }
            this.updateCollection({
                id: this.id,
                data: { typeId: this.type.id, name, description },
                onSuccess: this.onUpdateAttributeGroupSuccess,
                onError: this.onError,
            });
        },
        onUpdateAttributeGroupSuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Product collection updated' });
        },
        onRemoveSuccess() {
            this.$addAlert({ type: 'success', message: 'Product collection removed' });
            this.$router.push({ name: 'collections-grid' });
        },
    },
    head() {
        return {
            title: `${this.code} - Collections - Ergonode`,
        };
    },
};
</script>
