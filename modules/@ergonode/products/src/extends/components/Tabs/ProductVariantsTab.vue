/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <Preloader v-if="isPrefetchingData" />
            <template v-else>
                <AttachedProductVariantsGrid v-if="bindings.length" />
                <TabBarNoDataPlaceholder
                    v-else
                    v-bind="listPlaceholder">
                    <template #action>
                        <AddBindingAttributesButton />
                    </template>
                </TabBarNoDataPlaceholder>
            </template>
        </template>
    </CenterViewTemplate>
</template>

<script>
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import AddBindingAttributesButton from '@Products/extends/components/Buttons/AddBindingAttributesButton';
import AttachedProductVariantsGrid from '@Products/extends/components/Grids/AttachedProductVariantsGrid';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductVariantsTab',
    components: {
        AttachedProductVariantsGrid,
        CenterViewTemplate,
        AddBindingAttributesButton,
    },
    mixins: [
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
                style: 'margin-top: 24px; align-self: center',
                title: this.$t('@Products.productExtend.components.ProductVariantsTab.placeholderTitle'),
                subtitle: this.$t('@Products.productExtend.components.ProductVariantsTab.placeholderSubtitle'),
            };
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
