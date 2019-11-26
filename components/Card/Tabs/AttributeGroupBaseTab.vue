/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <BaseForm>
                <AttributeGroupBaseCard />
            </BaseForm>
        </template>
        <template #footer>
            <Footer :button="updateButton" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import AttributeGroupBaseCard from '~/components/Card/Cards/AttributeGroupBaseCard';
import Footer from '~/components/ReusableFooter/Footer';
import ResponsiveCenteredViewTemplate from '~/components/Layout/ResponsiveCenteredViewTemplate';
import BaseForm from '~/components/Form/BaseForm';

export default {
    name: 'AttributeBaseTab',
    components: {
        ResponsiveCenteredViewTemplate,
        Footer,
        AttributeGroupBaseCard,
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
