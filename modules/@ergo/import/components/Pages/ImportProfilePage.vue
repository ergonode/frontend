/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-read-only="$isReadOnly('IMPORT')"
            @navigateBack="onDismiss">
            <template #mainAction>
                <Button
                    title="IMPORT NOW"
                    :size="smallSize"
                    :disabled="!$hasAccess(['IMPORT_UPDATE'])"
                    @click.native="onShowModal" />
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
        <Footer flex-end>
            <Button
                title="SAVE IMPORT PROFILE"
                :size="smallSize"
                :disabled="$isLoading('footerButton')"
                @click.native="onSave" />
        </Footer>
    </Page>
</template>

<script>
import { SIZE, THEME } from '@Core/defaults/theme';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';
import categoryManagementPageBaseMixin from '@Core/mixins/page/categoryManagementPageBaseMixin';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';

export default {
    name: 'ImportProfilePage',
    mixins: [categoryManagementPageBaseMixin, gridModalMixin],
    computed: {
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
};
</script>
