/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributePage
        :title="code"
        is-edit
        @dismiss="onDismiss"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>

import { mapState, mapActions } from 'vuex';
import { getMappedGroupIDs, getMappedOptions, getMappedParameterKeys } from '~/model/mappers/attributeMapper';
import { isThereAnyTranslation, getParsedTranslations } from '~/model/mappers/translationsMapper';

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'NewAttribute',
    middleware: ['tab/redirectToAttributeGeneral'],
    components: {
        AttributePage: () => import('~/components/Pages/AttributePage'),
    },
    computed: {
        ...mapState('attribute', {
            id: state => state.id,
            groups: state => state.groups,
            code: state => state.code,
            type: state => state.type,
            parameter: state => state.parameter,
            optionKeys: state => state.optionKeys,
            optionValues: state => state.optionValues,
            isMultilingual: state => state.isMultilingual,
        }),
        ...mapState('data', {
            attrGroups: state => state.attrGroups,
            attrTypes: state => state.attrTypes,
        }),
        ...mapState('translations', {
            translations: state => state.translations,
        }),
    },
    methods: {
        ...mapActions('attribute', [
            'updateAttribute',
            'removeAttribute',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push('/attributes/grid');
        },
        onUpdateAttributeSuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Attribute updated' });
            this.$router.push('/attributes/grid');
        },
        onRemoveSuccess() {
            this.$addAlert({ type: 'success', message: 'Attribute removed' });
            this.$router.push('/attributes/grid');
        },
        onRemove() {
            const isConfirm = confirm('Are you sure you want to delete this attribute?'); /* eslint-disable-line no-restricted-globals */
            if (isConfirm) {
                this.removeAttribute({
                    onSuccess: this.onRemoveSuccess,
                });
            }
        },
        onSave() {
            this.removeValidationErrors();
            // Select / Multi select key values cannot be empty
            if (this.optionKeys.length > 0 && this.optionKeys.some(key => key === '')) {
                return;
            }

            const { label, placeholder, hint } = this.translations;
            const propertiesToUpdate = {
                groups: getMappedGroupIDs(
                    this.attrGroups,
                    this.groups,
                ),
            };

            if (this.optionKeys.length > 0) {
                propertiesToUpdate.options = getMappedOptions(
                    this.optionKeys,
                    this.optionValues,
                    this.isMultilingual,
                );
            }

            // Parameters exist
            if (this.parameter) {
                propertiesToUpdate.parameters = getMappedParameterKeys(
                    this.attrTypes,
                    this.type,
                    this.parameter,
                    this.$store.state.data,
                );
            }

            if (isThereAnyTranslation(label)) {
                propertiesToUpdate.label = getParsedTranslations(label);
            }

            if (isThereAnyTranslation(hint)) {
                propertiesToUpdate.hint = getParsedTranslations(hint);
            }

            if (isThereAnyTranslation(placeholder)) {
                propertiesToUpdate.placeholder = getParsedTranslations(placeholder);
            }

            this.updateAttribute({
                id: this.id,
                data: propertiesToUpdate,
                onSuccess: this.onUpdateAttributeSuccess,
                onError: this.onError,
            });
        },
    },
    async fetch({
        store,
        params,
    }) {
        await store.dispatch('translations/clearStorage');
        await store.dispatch('attribute/clearStorage');
        await store.dispatch('attribute/getAttributeById', {
            attributeId: params.id,
        });
    },
};
</script>
