/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-read-only="isReadOnly">
            <template #prependHeader>
                <NavigateBackFab :previous-route="previousRoute" />
            </template>
            <template #mainAction>
                <template
                    v-for="(actionItem, index) in extendedMainAction">
                    <Component
                        :is="actionItem.component"
                        :key="index"
                        v-bind="bindingProps(actionItem)" />
                </template>
                <RemoveProductTemplateButton />
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs"
            :change-values="changeValues"
            :errors="errors" />
    </Page>
</template>

<script>
import beforeRouteEnterMixin from '@Core/mixins/route/beforeRouteEnterMixin';
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import beforeRouteUpdateMixin from '@Core/mixins/route/beforeRouteUpdateMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import RemoveProductTemplateButton from '@Templates/components/Buttons/RemoveProductTemplateButton';
import PRIVILEGES from '@Templates/config/privileges';
import {
    mapState,
} from 'vuex';

export default {
    name: 'Edit',
    components: {
        RemoveProductTemplateButton,
    },
    mixins: [
        asyncTabsMixin,
        beforeRouteEnterMixin,
        beforeRouteLeaveMixin,
        beforeRouteUpdateMixin,
    ],
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store,
        params,
    }) {
        await store.dispatch('productTemplate/getTemplate', {
            id: params.id,
        });
        await store.dispatch('dictionaries/getInitialDictionaries', {
            keys: [
                'attrTypes',
            ],
        });
    },
    computed: {
        ...mapState('productTemplate', [
            'title',
        ]),
        extendedMainAction() {
            return this.$getExtendSlot('@Templates/pages/product-templates/_template/mainAction');
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.TEMPLATE_DESIGNER.namespace);
        },
    },
    methods: {
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.TEMPLATE_DESIGNER,
                ...props,
            };
        },
    },
    head() {
        return {
            title: `${this.title} - ${this.$t('@Templates.productTemplate._.headTitle')}`,
        };
    },
};
</script>

<style lang="scss" scoped>
    .template-container {
        .template-container__content {
            display: grid;
            grid-template-columns: 300px auto;
        }
    }
</style>
