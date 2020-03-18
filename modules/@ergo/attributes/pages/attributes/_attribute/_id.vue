/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributePage
        :title="code"
        @dismiss="onDismiss"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>

import { mapState, mapActions } from 'vuex';
import { isEmpty, getKeyByValue } from '@Core/models/objectWrapper';
import { isThereAnyTranslation, getParsedTranslations } from '@Core/models/mappers/translationsMapper';
import { getParentRoutePath } from '@Core/models/navigation/tabs';
import { getParsedOptions, getParsedParameterKeys } from '@Attributes/models/attributeMapper';
import { getParamsOptionsForType } from '@Attributes/models/attributeTypes';
import { ALERT_TYPE } from '@Core/defaults/alerts';

export default {
    name: 'EditAttribute',
    components: {
        AttributePage: () => import('@Attributes/components/Pages/AttributePage'),
    },
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({ store, params }) {
        await store.dispatch('attribute/getAttributeGroups');
        await store.dispatch('attribute/getAttributeById', {
            attributeId: params.id,
        });
    },
    computed: {
        ...mapState('attribute', {
            id: state => state.id,
            groups: state => state.groups,
            code: state => state.code,
            type: state => state.type,
            parameter: state => state.parameter,
            options: state => state.options,
        }),
        ...mapState('translations', {
            translations: state => state.translations,
        }),
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('dictionaries', {
            attrTypes: state => state.attrTypes,
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
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Attribute updated' });
        },
        onRemoveSuccess() {
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Attribute removed' });
            this.$router.push({ name: 'attributes-grid' });
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
            const typeKey = getKeyByValue(this.attrTypes, this.type);
            const { label, placeholder, hint } = this.translations;
            const propertiesToUpdate = {
                groups: this.groups.map(group => group.id),
            };

            if (!isEmpty(this.options)) {
                const optionKeys = Object.keys(this.options);
                const uniqueOptions = new Set(optionKeys);

                if (optionKeys.some(key => key === '')) {
                    this.$addAlert({ type: ALERT_TYPE.WARNING, message: 'Options cannot have an empty keys' });
                    return;
                }

                if (optionKeys.length !== uniqueOptions.size) {
                    this.$addAlert({ type: ALERT_TYPE.WARNING, message: 'Option code must be unique' });
                    return;
                }

                propertiesToUpdate.options = getParsedOptions(this.options);
            }

            if (this.parameter) {
                const paramKey = getKeyByValue(getParamsOptionsForType(
                    typeKey,
                    this.$store.state.dictionaries,
                ), this.parameter);

                propertiesToUpdate.parameters = getParsedParameterKeys({
                    selectedType: typeKey,
                    selectedParam: paramKey,
                });
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
    head() {
        return {
            title: `${this.code} - Attributes - Ergonode`,
        };
    },
};
</script>
