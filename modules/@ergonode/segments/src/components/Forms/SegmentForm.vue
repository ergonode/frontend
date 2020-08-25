/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :fields-keys="[codeFieldKey]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :data-cy="dataCyGenerator(codeFieldKey)"
                    :value="code"
                    required
                    label="System name"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    :error-messages="errorMessages[codeFieldKey]"
                    hint="System name must be unique"
                    @input="setCodeValue" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Segments/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'SegmentForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        TextField: () => import('@Core/components/Inputs/TextField'),
    },
    computed: {
        ...mapState('segments', {
            segmentId: state => state.id,
            code: state => state.code,
            conditionSetId: state => state.conditionSetId,
        }),
        ...mapState('conditions', {
            conditionSets: state => state.conditionSets,
        }),
        isDisabled() {
            return Boolean(this.segmentId);
        },
        isDisabledByPrivileges() {
            return this.isDisabled && !this.$hasAccess([
                PRIVILEGES.SEGMENT.update,
            ]);
        },
        codeFieldKey() {
            return 'code';
        },
    },
    methods: {
        ...mapActions('segments', [
            '__setState',
        ]),
        setCodeValue(value) {
            this.__setState({
                key: 'code',
                value,
            });
        },
        dataCyGenerator(key) {
            return `segment-${key}`;
        },
    },
};
</script>
