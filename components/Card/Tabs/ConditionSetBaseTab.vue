/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <BaseForm>
                <ConditionSetBaseCard />
            </BaseForm>
        </template>
        <template #footer>
            <Footer :button="updateButton" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import Footer from '~/components/ReusableFooter/Footer';
import ConditionSetBaseCard from '~/components/Card/Cards/ConditionSetBaseCard';
import ResponsiveCenteredViewTemplate from '~/components/Layout/ResponsiveCenteredViewTemplate';
import BaseForm from '~/components/Form/BaseForm';

export default {
    name: 'ConditionSetBaseTab',
    components: {
        Footer,
        ConditionSetBaseCard,
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
