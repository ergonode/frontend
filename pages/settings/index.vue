/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper />
</template>

<script>
import PageWrapper from '~/components/Layout/PageWrapper';

export default {
    name: 'Settings',
    components: {
        PageWrapper,
    },
    data() {
        return {
            date: null,
            rangeDate: {
                from: null,
                to: null,
            },
        };
    },
};
</script>
