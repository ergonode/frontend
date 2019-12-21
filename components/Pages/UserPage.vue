/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-navigation-back="true"
            :is-read-only="$isReadOnly('USER')"
            @navigateBack="onDismiss">
            <!-- <template
                v-if="isEdit"
                #mainAction>
                <PrependIconButton
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE USER"
                    :disabled="!$hasAccess(['USER_DELETE'])"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template> -->
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
        <Footer>
            <Button
                :title="isEdit ? 'SAVE USER' : 'CREATE USER'"
                :loaded="$isLoaded('footerButton')"
                @click.native="onUpdate" />
        </Footer>
    </Page>
</template>

<script>
import { SIZES, THEMES } from '@Core/defaults/buttons';
import { getNestedTabRoutes } from '~/model/navigation/tabs';
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'UserPage',
    mixins: [categoryManagementPageBaseMixin],
    computed: {
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
    },
};
</script>
