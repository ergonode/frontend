/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <TransitionForm
                submit-title="SAVE CHANGES"
                :is-submitting="isSubmitting"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import TransitionForm from '@Transitions/components/Forms/TransitionForm';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'TransitionGeneralTab',
    components: {
        TransitionForm,
        CenterViewTemplate,
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState('statusTransition', {
            roles: state => state.roles,
            conditionSetId: state => state.conditionSetId,
        }),
        ...mapState('condition', {
            conditions: state => state.conditions,
            conditionsValues: state => state.conditionsValues,
        }),
    },
    methods: {
        ...mapActions('statusTransition', [
            'updateTransition',
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

            this.removeErrors();

            this.updateTransition({
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Status transition updated',
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
