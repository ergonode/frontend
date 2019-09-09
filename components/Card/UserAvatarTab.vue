/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab>
        <template v-slot:content>
            <UserAvatarCard />
        </template>
        <template v-slot:footer>
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
