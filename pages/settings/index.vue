/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <CheckBox v-model="check" />
    </PageWrapper>
</template>

<script>
import PageWrapper from '~/components/Layout/PageWrapper';
import CheckBox from '~/components/Inputs/CheckBox';

export default {
    name: 'Settings',
    components: {
        PageWrapper,
        CheckBox,
    },
    data() {
        return {
            check: 0,
        };
    },
};
</script>
