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
import { getParsedOptions, getParsedParameterKeys } from '~/model/mappers/attributeMapper';
import { isThereAnyTranslation, getParsedTranslations } from '~/model/mappers/translationsMapper';
import { getParentRoutePath } from '~/model/navigation/tabs';

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'EditAttribute',
    components: {
        AttributePage: () => import('~/components/Pages/AttributePage'),
    },
    computed: {
        ...mapState('attribute', {
            id: (state) => state.id,
            groups: (state) => state.groups,
            code: (state) => state.code,
            type: (state) => state.type,
            parameter: (state) => state.parameter,
            optionKeys: (state) => state.optionKeys,
            optionValues: (state) => state.optionValues,
            isMultilingual: (state) => state.isMultilingual,
        }),
        ...mapState('translations', {
            translations: (state) => state.translations,
        }),
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
    },
    destroyed() {
        this.clearStorage();
        this.clearTranslationsStorage();
        this.removeValidationErrors();
    },
    methods: {
        ...mapActions('attribute', [
            'updateAttribute',
            'removeAttribute',
            'clearStorage',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        ...mapActions('translations', {
            clearTranslationsStorage: 'clearStorage',
        }),
        onDismiss() {
            this.$router.push(getParentRoutePath(this.$route));
        },
        onUpdateAttributeSuccess() {
            this.$addAlert({ type: 'success', message: 'Attribute updated' });
            this.$router.push({ name: 'attributes' });
        },
        onRemoveSuccess() {
            this.$addAlert({ type: 'success', message: 'Attribute removed' });
            this.$router.push({ name: 'attributes' });
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

            const getTranslation = (value) => (this.isMultilingual
                ? getParsedTranslations(value)
                : { [this.userLanguageCode]: getParsedTranslations(value) });
            const { label, placeholder, hint } = this.translations;
            const propertiesToUpdate = {
                groups: this.groups.map((group) => group.id),
            };

            if (this.optionKeys.length > 0) {
                const uniqueOptions = new Set(this.optionKeys);

                if (this.optionKeys.some((key) => key === '')) {
                    this.$addAlert({ type: 'warning', message: 'Options cannot have an empty keys' });
                    return;
                }

                if (this.optionKeys.length !== uniqueOptions.size) {
                    this.$addAlert({ type: 'warning', message: 'Option code must be unique' });
                    return;
                }

                propertiesToUpdate.options = getParsedOptions(
                    this.optionKeys,
                    this.optionValues,
                    this.isMultilingual,
                );
            }

            if (this.parameter) {
                propertiesToUpdate.parameters = getParsedParameterKeys({
                    selectedType: this.type,
                    selectedParam: this.parameter,
                });
            }

            if (isThereAnyTranslation(label)) {
                propertiesToUpdate.label = getTranslation(label);
            }

            if (isThereAnyTranslation(hint)) {
                propertiesToUpdate.hint = getTranslation(hint);
            }

            if (isThereAnyTranslation(placeholder)) {
                propertiesToUpdate.placeholder = getTranslation(placeholder);
            }

            this.updateAttribute({
                id: this.id,
                data: propertiesToUpdate,
                onSuccess: this.onUpdateAttributeSuccess,
                onError: this.onError,
            });
        },
    },
    async fetch({ store, params }) {
        await store.dispatch('attribute/getAttributeGroups');
        await store.dispatch('attribute/getAttributeById', {
            attributeId: params.id,
        });
    },
};
</script>
