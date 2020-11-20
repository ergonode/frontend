/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-read-only="isReadOnly">
            <template #prependHeader>
                <NavigateBackFab />
            </template>
            <template #mainAction>
                <template
                    v-for="(actionItem, index) in extendedMainAction">
                    <Component
                        :is="actionItem.component"
                        :key="index"
                        v-bind="bindingProps(actionItem)" />
                </template>
                <RemoveAttributeButton />
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
import RemoveAttributeButton from '@Attributes/components/Buttons/RemoveAttributeButton';
import PRIVILEGES from '@Attributes/config/privileges';
import editPageMixin from '@Core/mixins/page/editPageMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';

export default {
    name: 'AttributeGroupPage',
    components: {
        RemoveAttributeButton,
    },
    mixins: [
        editPageMixin,
        asyncTabsMixin,
    ],
    computed: {
        extendedMainAction() {
            return this.$getExtendedComponents('@Attributes/components/Pages/AttributeGroupPage/mainAction');
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.ATTRIBUTE_GROUP.namespace);
        },
    },
    methods: {
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.ATTRIBUTE_GROUP,
                ...props,
            };
        },
    },
};
</script>
