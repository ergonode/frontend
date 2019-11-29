/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <BaseForm>
                <UserRolesBaseCard />
            </BaseForm>
        </template>
        <template #footer>
            <Footer :button="updateButton" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import UserRolesBaseCard from '~/components/Card/Cards/UserRolesBaseCard';
import ResponsiveCenteredViewTemplate from '~/core/components/Layout/ResponsiveCenteredViewTemplate';
import Footer from '~/components/ReusableFooter/Footer';
import BaseForm from '~/components/Form/BaseForm';

export default {
    name: 'UserRolesBaseTab',
    components: {
        Footer,
        ResponsiveCenteredViewTemplate,
        UserRolesBaseCard,
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
