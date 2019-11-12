/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <BaseForm>
                <CategoryTreeBaseCard slot="content" />
            </BaseForm>
        </template>
        <template #footer>
            <Footer :button="updateButton" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import CategoryTreeBaseCard from '~/components/Card/Cards/CategoryTreeBaseCard';
import ResponsiveCenteredViewTemplate from '~/components/Layout/ResponsiveCenteredViewTemplate';
import Footer from '~/components/ReusableFooter/Footer';
import BaseForm from '~/components/Form/BaseForm';

export default {
    name: 'CategoryTreeBaseTab',
    components: {
        Footer,
        CategoryTreeBaseCard,
        ResponsiveCenteredViewTemplate,
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
