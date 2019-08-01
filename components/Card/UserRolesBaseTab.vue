/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab :update-button="updateButton">
        <template v-slot:content>
            <UserRolesBaseCard />
        </template>
        <template v-slot:footer>
            <Footer
                :buttons="[...updateButton]" />
        </template>
    </BaseTab>
</template>

<script>
import UserRolesBaseCard from '~/components/Card/UserRolesBaseCard';
import BaseTab from '~/components/Card/BaseTab';

export default {
    name: 'UserRolesBaseTab',
    components: {
        Footer: () => import('~/components/ReusableFooter/Footer'),
        BaseTab,
        UserRolesBaseCard,
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
};
</script>
