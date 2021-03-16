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
import Preloader from '@UI/components/Preloader/Preloader';
import TabBarNoDataPlaceholder from '@UI/components/TabBar/TabBarNoDataPlaceholder';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductVariantsTab',
    components: {
        AttachedProductVariantsGrid,
        Preloader,
        CenterViewTemplate,
        AddBindingAttributesButton,
        TabBarNoDataPlaceholder,
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
                title: 'No binding attributes',
                subtitle: 'Binding attribute is the common attribute of the products, which link products together into the product with variants.',
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
