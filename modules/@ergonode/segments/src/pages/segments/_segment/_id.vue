/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SegmentPage
        :title="code"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import {
    getMappedConditionSetData,
} from '@Conditions/models/conditionSetMapper';
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
    name: 'SegmentEdit',
    components: {
        SegmentPage: () => import('@Segments/components/Pages/SegmentPage'),
    },
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store,
        params,
    }) {
        await Promise.all([
            store.dispatch('translations/__clearStorage'),
            store.dispatch('segments/__clearStorage'),
        ]);
        await store.dispatch('segments/getSegment', {
            segmentId: params.id,
        });
    },
    computed: {
        ...mapState('segments', {
            id: state => state.id,
            code: state => state.code,
            conditionSetId: state => state.conditionSetId,
        }),
        ...mapState('translations', {
            translations: state => state.translations,
        }),
        ...mapState('conditions', {
            conditionsValues: state => state.conditionsValues,
            conditions: state => state.conditions,
        }),
    },
    destroyed() {
        this.clearSegmentStorage();
        this.clearConditionSetStorage();
    },
    methods: {
        ...mapActions('conditions', {
            createConditionSet: 'createConditionSet',
            updateConditionSet: 'updateConditionSet',
            clearConditionSetStorage: '__clearStorage',
        }),
        ...mapActions('segments', {
            updateSegment: 'updateSegment',
            removeSegment: 'removeSegment',
            clearSegmentStorage: '__clearStorage',
        }),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this segment?',
                confirmCallback: () => this.removeSegment({
                    onSuccess: this.onRemoveSegmentSuccess,
                }),
            });
        },
        onSave() {
            const propertiesToUpdate = {
                conditions: getMappedConditionSetData(this.conditionsValues, this.conditions),
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
            const {
                name, description,
            } = this.translations;
            const data = {
                condition_set_id: conditionSetId,
                name,
                description,
            };

            this.updateSegment({
                id: this.id,
                data,
                onSuccess: this.onUpdateSegmentsSuccess,
                onError: this.onError,
            });
        },
        onUpdateSegmentsSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Segment updated',
            });
        },
        onRemoveSegmentSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Segment removed',
            });
            this.$router.push({
                name: 'segments-grid',
            });
        },
    },
    head() {
        return {
            title: `${this.code} - Segments - Ergonode`,
        };
    },
};
</script>
