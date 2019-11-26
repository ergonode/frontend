/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BasePage>
        <TitleBar
            :title="title"
            :icon="icon"
            :is-read-only="$isReadOnly('PRODUCT')">
            <template #mainAction>
                <PrependIconButton
                    title="NEW PRODUCT"
                    :size="smallSize"
                    :disabled="!$hasAccess(['PRODUCT_CREATE'])"
                    @click.native="addProduct">
                    <template #prepend="{ color }">
                        <IconAdd
                            :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
        <TrashCan v-show="draggedElementOnGrid" />
    </BasePage>
</template>

<script>
import { mapState } from 'vuex';
import { SIZES } from '~/defaults/buttons';
import { DRAGGED_ELEMENT } from '~/defaults/grid';
import PrependIconButton from '~/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';


export default {
    name: 'GridProductPage',
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
        BasePage: () => import('~/components/Layout/BasePage'),
        TrashCan: () => import('~/components/DragAndDrop/TrashCan'),
        PrependIconButton,
        IconAdd,
        // Blur: () => import('~/components/Blur/Blur'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: false,
            default: null,
        },
    },
    beforeCreate() {
        this.tabs = [
            {
                title: 'Products',
                route: { name: 'products-grid' },
            },
        ];
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: (state) => state.isListElementDragging,
            draggedElementOnGrid: (state) => state.draggedElementOnGrid,
        }),
        smallSize() {
            return SIZES.SMALL;
        },
        isBlurVisible() {
            return this.isListElementDragging || this.draggedElementOnGrid;
        },
        blurZIndex() {
            if (this.isListElementDragging) {
                return { zIndex: '10' };
            }

            if (this.draggedElementOnGrid === DRAGGED_ELEMENT.FILTER) {
                return { zIndex: '15' };
            }

            if (this.draggedElementOnGrid === DRAGGED_ELEMENT.COLUMN) {
                return { zIndex: '20' };
            }

            return null;
        },
    },
    methods: {
        addProduct() {
            this.$router.push('/products/product/new');
        },
    },
    beforeDestroy() {
        delete this.tabs;
    },
};
</script>
