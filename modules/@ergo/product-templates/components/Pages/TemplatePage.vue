/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-navigation-back="true"
            :is-read-only="$isReadOnly('TEMPLATE_DESIGNER')"
            @navigateBack="onDismiss">
            <template
                v-if="isEdit"
                #mainAction>
                <Button
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE TEMPLATE"
                    :disabled="!$hasAccess(['TEMPLATE_DESIGNER_DELETE'])"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete
                            :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
        <Footer>
            <Button
                :title="isEdit ? 'SAVE TEMPLATE' : 'CREATE TEMPLATE'"
                :disabled="$isLoading('footerButton')"
                @click.native="onUpdate" />
        </Footer>
        <Blur
            v-show="isBlurVisible"
            :style="blurZIndex" />
        <TrashCan v-show="draggedElementOnGrid" />
    </Page>
</template>

<script>

import { mapState } from 'vuex';
import { Z_INDEX_LVL_0 } from '@Core/assets/scss/_js-variables/indexes.scss';
import { SIZES, THEMES } from '@Core/defaults/buttons';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';
import categoryManagementPageBaseMixin from '@Core/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'TemplatePage',
    mixins: [categoryManagementPageBaseMixin],
    components: {
        TrashCan: () => import('@Core/components/DragAndDrop/TrashCan'),
        Blur: () => import('@Core/components/Blur/Blur'),
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: (state) => state.isListElementDragging,
            draggedElementOnGrid: (state) => state.draggedElementOnGrid,
        }),
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        isBlurVisible() {
            return this.isListElementDragging || this.draggedElementOnGrid;
        },
        blurZIndex() {
            if (this.isBlurVisible) {
                return { zIndex: Z_INDEX_LVL_0 };
            }
            return null;
        },
    },
};
</script>
