/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-navigation-back="true"
            :is-read-only="$isReadOnly('ATTRIBUTE')"
            @navigateBack="onDismiss">
            <template
                v-if="isEdit"
                #mainAction>
                <Button
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE GROUP"
                    :disabled="!$hasAccess(['ATTRIBUTE_DELETE'])"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
        <Footer>
            <Button
                :title="isEdit ? 'SAVE GROUP' : 'CREATE GROUP'"
                :loaded="$isLoaded('footerButton')"
                @click.native="onUpdate" />
        </Footer>
    </Page>
</template>

<script>
import { SIZES, THEMES } from '~/defaults/buttons';
import { getNestedTabRoutes } from '~/model/navigation/tabs';
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'AttributeGroupPage',
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
