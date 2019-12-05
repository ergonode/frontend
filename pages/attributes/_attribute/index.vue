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
    getParsedGroups,
    getParsedParameterKeys,
    getParsedOptions,
} from '~/model/mappers/attributeMapper';

export default {
    name: 'NewAttribute',
    middleware: ['tab/redirectToAttributeGeneral'],
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
            optionKeys: (state) => state.optionKeys,
            optionValues: (state) => state.optionValues,
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
            this.$router.push('/attributes/grid');
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
            if (this.optionKeys.length > 0 && this.optionKeys.some((key) => key === '')) {
                this.$addAlert({ type: 'warning', message: 'Options cannot have an empty keys' });
                return;
            }

            const attribute = {
                code: this.code,
                type: this.type,
                groups: getParsedGroups(this.groups),
                multilingual: this.multilingual,
            };

            if (this.optionKeys.length > 0) {
                attribute.options = getParsedOptions(
                    this.optionKeys,
                    this.optionValues,
                );
            }

            if (this.parameter) {
                attribute.parameters = getParsedParameterKeys({
                    selectedType: this.type,
                    selectedParam: this.parameter,
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
