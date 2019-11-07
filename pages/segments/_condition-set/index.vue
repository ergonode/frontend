/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ConditionSetPage
        :title="code || 'New Condition Set'"
        @dismiss="onDismiss"
        @create="onCreate" />
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'SegmentsConditionSetNew',
    middleware: ['tab/redirectToConditionSetGeneral'],
    components: {
        ConditionSetPage: () => import('~/components/Pages/ConditionSetPage'),
    },
    computed: {
        ...mapState('conditions', {
            code: (state) => state.code,
        }),
    },
    created() {
        this.clearStorage();
        this.clearDesignerStorage();
    },
    methods: {
        ...mapActions('gridDesigner', {
            clearDesignerStorage: 'clearStorage',
        }),
        ...mapActions('conditions', [
            'createConditionSet',
            'clearStorage',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push('/segments/condition-sets');
        },
        onCreateConditionSetSuccess(id) {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Condition set created' });
            this.$router.push({
                name: 'segments-condition-set-edit-id',
                params: {
                    id,
                },
            });
        },
        onCreate() {
            this.removeValidationErrors();
            const condition = {
                code: this.code,
                parent: 'segment',
            };
            this.createConditionSet({
                data: condition,
                onSuccess: this.onCreateConditionSetSuccess,
                onError: this.onError,
            });
        },
    },
};
</script>
