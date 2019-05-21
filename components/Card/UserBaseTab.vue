/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab :update-button="updateButton">
        <UserBaseCard slot="content" />
        <Footer
            slot="footer"
            :buttons="[...updateButton]" />
    </BaseTab>
</template>

<script>
import UserBaseCard from '~/components/Card/UserBaseCard';
import BaseTab from '~/components/Card/BaseTab';

export default {
    name: 'UserBaseTab',
    components: {
        Footer: () => import('~/components/ReusableFooter/Footer'),
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
