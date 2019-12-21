/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form>
        <FormGroup>
            <TextField
                :value="code"
                solid
                regular
                required
                label="Code"
                :disabled="isDisabled || isDisabledByPrivileges"
                :error-messages="errorCodeMessage"
                hint="Code must be unique"
                @input="setCode" />
        </FormGroup>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'SegmentsForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormGroup: () => import('@Core/components/Form/FormGroup'),
        TextField: () => import('@Core/components/Inputs/TextField'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('segments', {
            segmentId: (state) => state.id,
            code: (state) => state.code,
            conditionSetId: (state) => state.conditionSetId,
        }),
        ...mapState('conditions', {
            conditionSets: (state) => state.conditionSets,
        }),
        isDisabled() {
            return Boolean(this.segmentId);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['SEGMENT_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['SEGMENT_CREATE']));
        },
        errorCodeMessage() {
            const codeIndex = 'code';
            return this.elementIsValidate(codeIndex);
        },
    },
    methods: {
        ...mapActions('segments', [
            'setCode',
        ]),
    },
};
</script>
