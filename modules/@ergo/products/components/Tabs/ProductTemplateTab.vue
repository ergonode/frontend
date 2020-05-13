/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #header>
            <div class="view-template-header__section">
                <TreeSelect
                    :style="{ flex: '0 0 192px' }"
                    :value="language"
                    solid
                    small
                    label="Edit language"
                    :options="languageOptions"
                    @input="onLanguageChange" />
                <!-- Uncomment when needed
                <Toggler
                    :value="missingValues"
                    label="Show only the missing values"
                    @input="setOnlyMissingValues" /> -->
            </div>
            <div class="view-template-header__section">
                <ProductCompleteness :completeness="completeness" />
                <Button
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="RESTORE"
                    :disabled="!isUserAllowedToUpdate"
                    @click.native="onShowModal">
                    <template #prepend="{ color }">
                        <IconRestore :fill-color="color" />
                    </template>
                </Button>
            </div>
            <RestoreParentAttributeValue
                v-if="isModalVisible"
                @close="onCloseModal"
                @create="onCreatedData" />
        </template>
        <template #centeredContent>
            <ProductTemplateForm
                :language="language"
                :elements="elements"
                @valueUpdated="onValueUpdated" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { SIZE, THEME } from '@Core/defaults/theme';
import getProductTemplate from '@Products/services/getProductTemplate.service';
import getProductCompleteness from '@Products/services/getProductCompleteness.service';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import ProductTemplateForm from '@Products/components/Forms/ProductTemplateForm';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';

export default {
    name: 'ProductTemplateTab',
    components: {
        ResponsiveCenteredViewTemplate,
        ProductTemplateForm,
        RestoreParentAttributeValue: () => import('@Products/components/Modals/RestoreParentAttributeValue'),
        ProductCompleteness: () => import('@Products/components/Progress/ProductCompleteness'),
        TreeSelect: () => import('@Core/components/Inputs/Select/Tree/TreeSelect'),
        // Toggler: () => import('@Core/components/Inputs/Toggler/Toggler'),
        Button: () => import('@Core/components/Buttons/Button'),
        IconRestore: () => import('@Core/components/Icons/Actions/IconRestore'),
    },
    mixins: [gridModalMixin],
    asyncData({ app: { $axios }, store, params: { id } }) {
        const { languagePrivilegesDefaultCode } = store.state.authentication.user;

        return Promise.all([
            getProductTemplate({ $axios, languageCode: languagePrivilegesDefaultCode, id }),
            getProductCompleteness({ $axios, languageCode: languagePrivilegesDefaultCode, id }),
        ]).then(([templateResponse, completenessResponse]) => ({
            elements: templateResponse.elements,
            completeness: completenessResponse,
        }));
    },
    data() {
        return {
            language: {},
        };
    },
    computed: {
        ...mapState('authentication', {
            user: state => state.user,
        }),
        ...mapState('dictionaries', {
            languagesTree: state => state.languagesTree,
        }),
        ...mapState('product', {
            id: state => state.id,
        }),
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        languageOptions() {
            return Object.values(this.languagesTree).map(language => ({
                ...language,
                key: language.code,
                value: language.name,
                disabled: !language.privileges.read,
            }));
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess(['PRODUCT_UPDATE']);
        },
    },
    created() {
        const { languagePrivilegesDefaultCode } = this.user;

        this.language = this.languageOptions
            .find(languegeCode => languegeCode.code === languagePrivilegesDefaultCode);
    },
    methods: {
        ...mapActions('product', [
            'getProductDraft',
        ]),
        onLanguageChange(value) {
            const languageCode = value.code;

            Promise.all([
                getProductTemplate({
                    $axios: this.$axios,
                    languageCode,
                    id: this.id,
                }),
                getProductCompleteness({
                    $axios: this.$axios,
                    languageCode,
                    id: this.id,
                }),
                this.getProductDraft({
                    languageCode,
                    id: this.id,
                }),
            ]).then(([templateResponse, completenessResponse]) => {
                this.elements = templateResponse.elements;
                this.completeness = completenessResponse;
                this.language = value;
            });
        },
        onValueUpdated() {
            getProductCompleteness({
                $axios: this.$axios,
                languageCode: this.language.code,
                id: this.id,
            }).then((response) => {
                this.completeness = response;
            });
        },
    },
};
</script>
<style lang="scss" scoped>
    .view-template-header__section {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 24px;
    }
</style>
