/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <SegmentForm
                submit-title="SAVE CHANGES"
                :is-submitting="isSubmitting"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import {
    getMappedConditionSetData,
} from '@Conditions/models/conditionSetMapper';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import SegmentForm from '@Segments/components/Forms/SegmentForm';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'SegmentGeneralTab',
    components: {
        SegmentForm,
        CenterViewTemplate,
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState('segment', {
            conditionSetId: state => state.conditionSetId,
        }),
        ...mapState('condition', {
            conditions: state => state.conditions,
            conditionsValues: state => state.conditionsValues,
        }),
    },
    methods: {
        ...mapActions('segment', [
            'updateSegment',
        ]),
        ...mapActions('condition', [
            'createConditionSet',
            'updateConditionSet',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            const data = {
                conditions: getMappedConditionSetData(
                    this.conditionsValues,
                    this.conditions,
                ),
            };

            this.removeErrors();

            if (!this.conditionSetId) {
                this.createConditionSet({
                    data,
                    onSuccess: this.onCreateConditionSet,
                    onError: this.onUpdateError,
                });
            } else {
                this.updateConditionSet({
                    id: this.conditionSetId,
                    data,
                    onSuccess: this.onCreateConditionSet,
                    onError: this.onUpdateError,
                });
            }
        },
        onCreateConditionSet(conditionSetId) {
            this.updateSegment({
                conditionSetId,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Segment updated',
            });

            this.isSubmitting = false;
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
