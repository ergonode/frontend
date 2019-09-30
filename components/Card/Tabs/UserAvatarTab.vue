/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab>
        <template #content>
            <UserAvatarCard />
        </template>
        <template #footer>
            <Footer
                :buttons="[...updateButton]" />
        </template>
    </BaseTab>
</template>

<script>
import BaseTab from '~/components/Card/BaseTab';
import UserAvatarCard from '~/components/Card/UserAvatarCard';
import Footer from '~/components/ReusableFooter/Footer';

export default {
    name: 'UserAvatarTab',
    components: {
        Footer,
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
