/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridViewTemplate>
        <template #sidebar>
            <VerticalTabBar :items="verticalTabs">
                <RemoveLanguageDropZone />
            </VerticalTabBar>
        </template>
        <template #grid>
            <LanguageInheritanceTreeDesigner
                :scope="scope"
                :errors="errors"
                :change-values="changeValues" />
            <UpdateLanguagesInheritanceButton
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </GridViewTemplate>
</template>

<script>
import UpdateLanguagesInheritanceButton from '@Core/components/Buttons/UpdateLanguagesInheritanceButton';
import RemoveLanguageDropZone from '@Core/components/DropZones/RemoveElementDropZone';
import LanguageInheritanceTreeDesigner from '@Core/components/LanguageInheritanceTreeDesigner/LanguageInheritanceTreeDesigner';
import PRIVILEGES from '@Core/config/privileges';
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import GridViewTemplate from '@UI/components/Layout/Templates/GridViewTemplate';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'LanguagesSettingsTab',
    components: {
        RemoveLanguageDropZone,
        UpdateLanguagesInheritanceButton,
        GridViewTemplate,
        LanguageInheritanceTreeDesigner,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    data() {
        return {
            verticalTabs: [],
        };
    },
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SETTINGS.update,
            ]);
        },
    },
    async mounted() {
        const extendedVerticalTabs = await this.$getExtendMethod('@Core/components/Tabs/LanguagesSettingsTab/verticalTabs', {
            $this: this,
            props: {
                disabled: !this.isAllowedToUpdate,
            },
        });

        this.verticalTabs = [].concat(...extendedVerticalTabs);
    },
    async beforeDestroy() {
        if (!this.changeValues.saved) {
            await this.getLanguageTree({});
            this.removeDisabledScopeElements(this.scope);
        }
    },
    methods: {
        ...mapActions('core', [
            'getLanguageTree',
        ]),
        ...mapActions('list', [
            'removeDisabledScopeElements',
        ]),
    },
};
</script>
