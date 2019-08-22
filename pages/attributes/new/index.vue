/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributePage
        :title="title"
        @dismiss="onDismiss"
        @create="onCreate" />
</template>

<script>

import { mapState, mapActions } from 'vuex';
import {
    getMappedType,
    getMappedGroupIDs,
    getMappedParameterKeys,
    getMappedOptions,
} from '~/model/mappers/attributeMapper';

export default {
    name: 'NewAttribute',
    middleware: ['tab/redirectToAttributeGeneral'],
    components: {
        AttributePage: () => import('~/components/Pages/AttributePage'),
    },
    data: () => ({
        title: 'New attribute',
    }),
    computed: {
        ...mapState('attribute', {
            code: state => state.code,
            groups: state => state.groups,
            type: state => state.type,
            multilingual: state => state.isMultilingual,
            parameter: state => state.parameter,
            optionKeys: state => state.optionKeys,
            optionValues: state => state.optionValues,
        }),
        ...mapState('data', {
            attrTypes: state => state.attrTypes,
            attrGroups: state => state.attrGroups,
        }),
    },
    created() {
        this.clearStorage();
    },
    methods: {
        ...mapActions('attribute', [
            'createAttribute',
            'clearStorage',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push('/attributes');
        },
        onCreateAttributeSuccess(id) {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Attribute created' });
            this.$router.push({
                name: 'attributes-edit-id',
                params: {
                    id,
                },
            });
        },
        onCreate() {
            this.removeValidationErrors();
            // Select / Multi select key values cannot be empty
            if (this.optionKeys.length > 0 && this.optionKeys.some(key => key === '')) {
                return;
            }

            const attribute = {
                code: this.code,
                type: getMappedType(
                    this.attrTypes,
                    this.type,
                ),
                groups: getMappedGroupIDs(
                    this.attrGroups,
                    this.groups,
                ),
                options: getMappedOptions(
                    this.optionKeys,
                    this.optionValues,
                ),
                multilingual: this.multilingual,
            };

            if (this.parameter !== '') {
                attribute.parameters = getMappedParameterKeys(
                    this.attrTypes,
                    this.type,
                    this.parameter,
                    this.$store.state.data,
                );
            }

            this.createAttribute({
                data: attribute,
                onSuccess: this.onCreateAttributeSuccess,
                onError: this.onError,
            });
        },
    },
};
</script>
