/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab :update-button="updateButton">
        <template v-slot:content>
            <UserBaseCard />
        </template>
        <template v-slot:footer>
            <Footer
                :buttons="[...updateButton]" />
        </template>
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
