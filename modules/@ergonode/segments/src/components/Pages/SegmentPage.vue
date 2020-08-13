/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-navigation-back="true"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <Button
                    data-cy="delete-segment"
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE SEGMENT"
                    :disabled="!isAllowedToDelete"
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
                data-cy="save-segment"
                title="SAVE SEGMENT"
                :size="smallSize"
                :disabled="$isLoading('footerButton')"
                @click.native="onSave" />
        </Footer>
    </Page>
</template>

<script>
import editPageMixin from '@Core/mixins/page/editPageMixin';
import PRIVILEGES from '@Segments/config/privileges';

export default {
    name: 'SegmentPage',
    mixins: [
        editPageMixin,
    ],
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.SEGMENT.namespace);
        },
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.SEGMENT.delete,
            ]);
        },
    },
};
</script>
