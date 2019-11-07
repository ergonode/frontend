/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ConditionSetPage
        :title="code"
        is-edit
        @dismiss="onDismiss"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getMappedConditionSetData } from '~/model/mappers/conditionSetMapper';
import { objectToArrayWithPropsName } from '~/model/objectWrapper';
import { isThereAnyTranslation, getParsedTranslations } from '~/model/mappers/translationsMapper';

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'SegmentsConditionSetEdit',
    middleware: ['tab/redirectToConditionSetGeneral'],
    components: {
        ConditionSetPage: () => import('~/components/Pages/ConditionSetPage'),
    },
    computed: {
        ...mapState('conditions', {
            id: (state) => state.id,
            code: (state) => state.code,
            conditionsValues: (state) => state.conditionsValues,
        }),
        ...mapState('gridDesigner', {
            fullGridData: (state) => state.fullGridData,
        }),
        ...mapState('translations', {
            translations: (state) => state.translations,
        }),
    },
    methods: {
        ...mapActions('gridDesigner', {
            clearDesignerStorage: 'clearStorage',
        }),
        ...mapActions('conditions', [
            'updateConditionSet',
            'removeConditionSet',
            'clearStorage',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onRemove() {
            const isConfirm = confirm('Are you sure you want to delete this condition set?'); /* eslint-disable-line no-restricted-globals */
            if (isConfirm) {
                this.removeConditionSet({
                    onSuccess: this.onRemoveConditionSetSuccess,
                });
            }
        },
        onDismiss() {
            this.$router.push('/segments/condition-sets');
        },
        onRemoveConditionSetSuccess() {
            this.$addAlert({ type: 'success', message: 'Condition set removed' });
            this.$router.push('/segments/condition-sets');
        },
        onUpdateConditionSetSuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Condition set updated' });
            this.$router.push('/segments/condition-sets');
        },
        onSave() {
            this.removeValidationErrors();
            const propertiesToUpdate = {
                conditions: getMappedConditionSetData(this.fullGridData, this.conditionsValues),
            };
            const { name, description } = this.translations;

            if (isThereAnyTranslation(name)) {
                propertiesToUpdate.name = getParsedTranslations(name);
            }
            if (isThereAnyTranslation(description)) {
                propertiesToUpdate.description = getParsedTranslations(description);
            }
            this.updateConditionSet({
                id: this.id,
                data: propertiesToUpdate,
                onSuccess: this.onUpdateConditionSetSuccess,
                onError: this.onError,
            });
        },
    },
    beforeDestroy() {
        this.clearStorage();
        this.clearDesignerStorage();
    },
    async fetch({
        store,
        params,
    }) {
        const { conditions } = store.state.data;
        const conditionsList = objectToArrayWithPropsName(conditions);
        await Promise.all([
            store.dispatch('gridDesigner/clearStorage'),
            store.dispatch('translations/clearStorage'),
            store.dispatch('list/clearStorage'),
            store.dispatch('conditions/clearStorage'),
            store.dispatch('list/setElementsForLanguage', conditionsList),
        ]);
        await store.dispatch('conditions/getConditionSetById', {
            conditionSetId: params.id,
        });
    },
};
</script>
