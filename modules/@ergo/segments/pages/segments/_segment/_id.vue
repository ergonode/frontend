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
import { getMappedConditionSetData } from '@Conditions/models/conditionSetMapper';
import { isThereAnyTranslation, getParsedTranslations } from '@Core/models/mappers/translationsMapper';
import { getParentRoutePath } from '@Core/models/navigation/tabs';

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'SegmentEdit',
    components: {
        SegmentPage: () => import('@Segments/components/Pages/SegmentPage'),
    },
    computed: {
        ...mapState('segments', {
            id: (state) => state.id,
            code: (state) => state.code,
            conditionSetId: (state) => state.conditionSetId,

        }),
        ...mapState('translations', {
            translations: (state) => state.translations,
        }),
        ...mapState('gridDesigner', {
            fullGridData: (state) => state.fullGridData,
        }),
        ...mapState('conditions', {
            conditionsValues: (state) => state.conditionsValues,
        }),
    },
    methods: {
        ...mapActions('conditions', {
            createConditionSet: 'createConditionSet',
            updateConditionSet: 'updateConditionSet',
            clearConditionSetStorage: 'clearStorage',
        }),
        ...mapActions('segments', {
            updateSegment: 'updateSegment',
            removeSegment: 'removeSegment',
            clearSegmentStorage: 'clearStorage',
        }),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push(getParentRoutePath(this.$route));
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
            const propertiesToUpdate = {
                conditions: getMappedConditionSetData(this.fullGridData, this.conditionsValues),
            };

            this.removeValidationErrors();
            if (!this.conditionSetId) {
                this.createConditionSet({
                    data: propertiesToUpdate,
                    onSuccess: this.onUpdateSegment,
                    onError: this.onError,
                });
            } else {
                this.updateConditionSet({
                    id: this.conditionSetId,
                    data: propertiesToUpdate,
                    onSuccess: this.onUpdateSegment,
                    onError: this.onError,
                });
            }
        },
        onUpdateSegment(conditionSetId) {
            const propertiesToUpdate = {
                condition_set_id: conditionSetId,
            };
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
            this.$addAlert({ type: 'success', message: 'Segment updated' });
            this.$router.push({ name: 'segments' });
        },
        onRemoveSegmentSuccess() {
            this.$addAlert({ type: 'success', message: 'Segment removed' });
            this.$router.push({ name: 'segments' });
        },
    },
    destroyed() {
        this.clearSegmentStorage();
        this.clearConditionSetStorage();
    },
    async fetch({
        store,
        params,
    }) {
        await Promise.all([
            store.dispatch('translations/clearStorage'),
            store.dispatch('segments/clearStorage'),
        ]);
        await store.dispatch('segments/getSegmentById', {
            segmentId: params.id,
        });
    },
};
</script>
