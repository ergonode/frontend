/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <VerticalFixedScroll>
                <TransitionForm />
            </VerticalFixedScroll>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import TransitionForm from '~/components/Forms/TransitionForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import VerticalFixedScroll from '@Core/components/Layout/Scroll/VerticalFixedScroll';

export default {
    name: 'TransitionBaseTab',
    components: {
        VerticalFixedScroll,
        TransitionForm,
        ResponsiveCenteredViewTemplate,
    },
};
</script>
