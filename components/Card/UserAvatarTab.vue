/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab :update-button="updateButton">
        <UserAvatarCard slot="content" />
        <Footer
            slot="footer"
            :buttons="[...updateButton]" />
    </BaseTab>
</template>

<script>
import BaseTab from '~/components/Card/BaseTab';
import UserAvatarCard from '~/components/Card/UserAvatarCard';

export default {
    name: 'UserAvatarTab',
    components: {
        Footer: () => import('~/components/ReusableFooter/Footer'),
        UserAvatarCard,
        BaseTab,
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
};
</script>
