/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SegmentPage
        :title="code"
        is-edit
        @dismiss="onDismiss"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { objectToArrayWithPropsName } from '~/model/objectWrapper';
import { isThereAnyTranslation, getParsedTranslations } from '~/model/mappers/translationsMapper';

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'EditSegment',
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
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push('/segments');
        },
        onUpdateSegmentsSuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Segment updated' });
            this.$router.push('/segments');
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
    },
    async fetch({
        store,
        params,
    }) {
        // const { conditions } = store.state.data;
        const conditions = {
            ATTRIBUTE_EXISTS_CONDITION: 'Attribute exists',
            ATTRIBUTE_NOT_EXISTS_CONDITION: 'Attribute Not exists',
        };
        const conditionsList = objectToArrayWithPropsName(conditions);

        await store.dispatch('gridDesigner/clearStorage');
        await store.dispatch('translations/clearStorage');
        await store.dispatch('list/clearStorage');
        await store.dispatch('segments/clearStorage');
        await store.dispatch('list/setElementsForLanguage', conditionsList);
        await store.dispatch('segments/getSegmentById', {
            segmentId: params.id,
        });
    },
};
</script>
