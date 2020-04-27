/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="General"
        :fields-keys="[codeFieldKey]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :value="code"
                    solid
                    regular
                    required
                    label="System name"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    :error-messages="errorMessages[codeFieldKey]"
                    hint="Code must be unique"
                    @input="setCode" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'SegmentForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/FormSection'),
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
            return (this.isDisabled && !this.$hasAccess(['SEGMENT_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['SEGMENT_CREATE']));
        },
        codeFieldKey() {
            return 'code';
        },
    },
    methods: {
        ...mapActions('segments', [
            'setCode',
        ]),
    },
};
</script>
