/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseCard>
        <Select
            solid
            :options="[]"
            label="Languages"
            regular
            multiselect
            clearable />
    </BaseCard>
</template>

<script>
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import BaseCard from '~/components/Card/BaseCard';

export default {
    name: 'LanguageSettingsCard',
    components: {
        BaseCard,
        Select: () => import('~/components/Inputs/Select/Select'),
    },
    mixins: [errorValidationMixin],
    computed: {
    },
    methods: {
    },
};
</script>
