/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-navigation-back="true"
            :is-read-only="$isReadOnly('WORKFLOW')">
            <template #mainAction>
                <Button
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE TRANSITION"
                    :disabled="!$hasAccess(['WORKFLOW_DELETE'])"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar :items="tabs" />
        <Footer flex-end>
            <Button
                title="SAVE TRANSITION"
                :size="smallSize"
                :disabled="$isLoading('footerButton')"
                @click.native="onSave" />
        </Footer>
    </Page>
</template>

<script>
import categoryManagementPageMixin from '@Core/mixins/page/categoryManagementPageMixin';

export default {
    name: 'TransitionPage',
    mixins: [
        categoryManagementPageMixin,
    ],
};
</script>
