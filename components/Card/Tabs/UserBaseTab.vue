/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <BaseForm>
                <UserBaseCard />
            </BaseForm>
        </template>
        <template #footer>
            <Footer :button="updateButton" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import UserBaseCard from '~/components/Card/Cards/UserBaseCard';
import ResponsiveCenteredViewTemplate from '~/core/components/Layout/ResponsiveCenteredViewTemplate';
import Footer from '~/components/ReusableFooter/Footer';
import BaseForm from '~/components/Form/BaseForm';

export default {
    name: 'UserBaseTab',
    components: {
        Footer,
        ResponsiveCenteredViewTemplate,
        UserBaseCard,
        BaseForm,
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
};
</script>
