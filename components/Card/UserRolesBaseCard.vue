/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseCard>
        <TextField
            :value="name"
            solid
            required
            regular
            label="Role name"
            :error-messages="errorNameMessage"
            @input="(name) => setName(name)" />
        <TextArea
            :value="description"
            solid
            required
            regular
            label="Role description"
            resize="none"
            :style="{height: '150px'}"
            :error-messages="errorDescMessage"
            @input="(description) => setDescription(description)" />
    </BaseCard>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import BaseCard from '~/components/Card/BaseCard';

export default {
    name: 'UserBaseCard',
    components: {
        BaseCard,
        TextField: () => import('~/components/Inputs/TextField'),
        TextArea: () => import('~/components/Inputs/TextArea'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('roles', {
            roleID: state => state.id,
            name: state => state.name,
            description: state => state.description,
        }),
        isDisabled() {
            return Boolean(this.roleID);
        },
        errorNameMessage() {
            const nameIndex = 'name';
            return this.elementIsValidate(nameIndex);
        },
        errorDescMessage() {
            const descriptionIndex = 'description';
            return this.elementIsValidate(descriptionIndex);
        },
    },
    methods: {
        ...mapActions('roles', [
            'setName',
            'setDescription',
        ]),
    },
};
</script>
