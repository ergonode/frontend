/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab>
        <template #content>
            <UserBaseCard />
        </template>
        <template #footer>
            <Footer :buttons="[...updateButton]" />
        </template>
    </BaseTab>
</template>

<script>
import UserBaseCard from '~/components/Card/UserBaseCard';
import BaseTab from '~/components/Card/BaseTab';
import Footer from '~/components/ReusableFooter/Footer';

export default {
    name: 'UserBaseTab',
    components: {
        Footer,
        BaseTab,
        UserBaseCard,
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
};
</script>
