/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SegmentPage
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
    name: 'SegmentEdit',
    middleware: ['tab/redirectToSegmentsGeneral'],
    components: {
        SegmentPage: () => import('~/components/Pages/SegmentPage'),
    },
    computed: {
        ...mapState('segments', {
            id: state => state.id,
            code: state => state.code,
        }),
        ...mapState('translations', {
            translations: state => state.translations,
        }),
    },
    methods: {
        ...mapActions('segments', [
            'updateSegment',
            'removeSegment',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push('/segments');
        },
        onRemove() {
            const isConfirm = confirm('Are you sure you want to delete this segment?'); /* eslint-disable-line no-restricted-globals */
            if (isConfirm) {
                this.removeSegment({
                    onSuccess: this.onRemoveSegmentSuccess,
                });
            }
        },
        onSave() {
            this.removeValidationErrors();
            const propertiesToUpdate = {};
            const { name, description } = this.translations;

            if (isThereAnyTranslation(name)) {
                propertiesToUpdate.name = getParsedTranslations(name);
            }
            if (isThereAnyTranslation(description)) {
                propertiesToUpdate.description = getParsedTranslations(description);
            }
            this.updateSegment({
                id: this.id,
                data: propertiesToUpdate,
                onSuccess: this.onUpdateSegmentsSuccess,
                onError: this.onError,
            });
        },
        onUpdateSegmentsSuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Segment updated' });
            this.$router.push('/segments/grid');
        },
        onRemoveSegmentSuccess() {
            this.$addAlert({ type: 'success', message: 'Segment removed' });
            this.$router.push('/segments/grid');
        },
    },
    async fetch({
        store,
        params,
    }) {
        await store.dispatch('translations/clearStorage');
        await store.dispatch('segments/clearStorage');
        await store.dispatch('segments/getSegmentById', {
            segmentId: params.id,
        });
    },
};
</script>
