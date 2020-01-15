/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributePage
        title="New Attribute"
        @dismiss="onDismiss"
        @create="onCreate" />
</template>

<script>

import { mapState, mapActions } from 'vuex';
import {
    getParsedParameterKeys,
    getParsedOptions,
} from '~/model/mappers/attributeMapper';
import { isMultilingual, getParamsOptionsForType } from '~/model/attributes/AttributeTypes';
import { getParentRoutePath } from '~/model/navigation/tabs';
import { isEmpty, getKeyByValue } from '~/model/objectWrapper';

export default {
    name: 'NewAttribute',
    components: {
        AttributePage: () => import('~/components/Pages/AttributePage'),
    },
    computed: {
        ...mapState('attribute', {
            code: (state) => state.code,
            groups: (state) => state.groups,
            type: (state) => state.type,
            multilingual: (state) => state.isMultilingual,
            parameter: (state) => state.parameter,
            options: (state) => state.options,
        }),
        ...mapState('data', {
            attrTypes: (state) => state.attrTypes,
        }),
    },
    methods: {
        ...mapActions('attribute', [
            'createAttribute',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push(getParentRoutePath(this.$route));
        },
        onAttributeCreated(id) {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Attribute created' });
            this.$router.push({
                name: 'attribute-edit-id-general',
                params: {
                    id,
                },
            });
        },
        onCreate() {
            const typeKey = getKeyByValue(this.attrTypes, this.type);
            const attribute = {
                code: this.code,
                type: typeKey,
                groups: this.groups.map((group) => group.id),
            };

            if (isMultilingual(typeKey)) {
                attribute.multilingual = this.multilingual;
            }

            if (!isEmpty(this.options)) {
                const optionKeys = Object.keys(this.options);
                const uniqueOptions = new Set(optionKeys);

                if (optionKeys.some((key) => key === '')) {
                    this.$addAlert({ type: 'warning', message: 'Options cannot have an empty keys' });
                    return;
                }

                if (optionKeys.length !== uniqueOptions.size) {
                    this.$addAlert({ type: 'warning', message: 'Option code must be unique' });
                    return;
                }

                attribute.options = getParsedOptions(this.options);
            }
            if (this.parameter) {
                const paramKey = getKeyByValue(getParamsOptionsForType(
                    typeKey,
                    this.$store.state.data,
                ), this.parameter);

                attribute.parameters = getParsedParameterKeys({
                    selectedType: typeKey,
                    selectedParam: paramKey,
                });
            }

            this.createAttribute({
                data: attribute,
                onSuccess: this.onAttributeCreated,
                onError: this.onError,
            });
        },
    },
    async fetch({ store }) {
        await store.dispatch('attribute/clearStorage');
        await store.dispatch('translations/clearStorage');
        await store.dispatch('attribute/getAttributeGroups');
    },
};
</script>
