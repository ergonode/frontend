/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <VerticalFixedScroll>
                <UserAvatarForm />
            </VerticalFixedScroll>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import UserAvatarForm from '~/components/Forms/UserAvatarForm';
import VerticalFixedScroll from '@Core/components/Layout/Scroll/VerticalFixedScroll';

export default {
    name: 'UserAvatarTab',
    components: {
        VerticalFixedScroll,
        UserAvatarForm,
        ResponsiveCenteredViewTemplate,
    },
};
</script>
