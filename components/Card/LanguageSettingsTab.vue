/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab>
        <LanguageSettingsCard slot="content" />
        <Footer
            slot="footer"
            :buttons="[...updateButton]" />
    </BaseTab>
</template>

<script>
import LanguageSettingsCard from '~/components/Card/LanguageSettingsCard';
import BaseTab from '~/components/Card/BaseTab';

export default {
    name: 'AttributeBaseTab',
    components: {
        Footer: () => import('~/components/ReusableFooter/Footer'),
        LanguageSettingsCard,
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
