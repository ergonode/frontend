/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <Preloader v-if="isPrefetchingData" />
            <template v-else>
                <AttachedProductVariantsGrid v-if="bindings.length" />
                <ListPlaceholder
                    v-else
                    v-bind="listPlaceholder">
                    <template #action>
                        <AddBindingAttributesButton />
                    </template>
                </ListPlaceholder>
            </template>
        </template>
    </CenterViewTemplate>
</template>

<script>
import {
    ORIENTATION,
} from '@Core/defaults/layout';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import AddBindingAttributesButton from '@Products/extends/components/Buttons/AddBindingAttributesButton';
import AttachedProductVariantsGrid from '@Products/extends/components/Grids/AttachedProductVariantsGrid';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import ListPlaceholder from '@UI/components/List/ListPlaceholder';
import Preloader from '@UI/components/Preloader/Preloader';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductVariantsTab',
    components: {
        AttachedProductVariantsGrid,
        Preloader,
        ListPlaceholder,
        CenterViewTemplate,
        AddBindingAttributesButton,
    },
    mixins: [
        extendedGridComponentsMixin,
        tabFeedbackMixin,
    ],
    data() {
        return {
            isPrefetchingData: true,
        };
    },
    computed: {
        ...mapState('product', [
            'bindings',
        ]),
        listPlaceholder() {
            return {
                style: 'width: 560px; max-height: 280px; margin-top: 24px; align-self: center',
                orientation: this.horizontalOrientation,
                title: 'No binding attributes',
                subtitle: 'Binding attribute is the common attribute of the products, which link products together into the product with variants.',
                bgUrl: require('@UI/assets/images/placeholders/comments.svg'),
            };
        },
        horizontalOrientation() {
            return ORIENTATION.HORIZONTAL;
        },
    },
    async created() {
        await Promise.all([
            this.getSelectAttributes(),
            this.getProductBindings(this.$route.params.id),
        ]);

        this.isPrefetchingData = false;
    },
    methods: {
        ...mapActions('product', [
            'getProductBindings',
            'getSelectAttributes',
        ]),
    },
};
</script>
