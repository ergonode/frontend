/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <BaseForm>
                <AttributeBaseCard />
            </BaseForm>
        </template>
        <template #footer>
            <Footer :button="updateButton" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import AttributeBaseCard from '~/components/Card/Cards/AttributeBaseCard';
import Footer from '~/components/ReusableFooter/Footer';
import ResponsiveCenteredViewTemplate from '~/components/Layout/ResponsiveCenteredViewTemplate';
import BaseForm from '~/components/Form/BaseForm';

export default {
    name: 'AttributeBaseTab',
    components: {
        ResponsiveCenteredViewTemplate,
        Footer,
        AttributeBaseCard,
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
