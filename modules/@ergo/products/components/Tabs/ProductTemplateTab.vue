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
                    :disabled="!isUserAllowedToRestore"
                    @click.native="onShowModal">
                    <template #prepend="{ color }">
                        <IconRestore :fill-color="color" />
                    </template>
                </Button>
            </div>
            <RestoreAttributeParentModalForm
                v-if="isModalVisible"
                :language="language"
                :elements="elements"
                @restore="onRestoreDraftValues"
                @close="onCloseModal" />
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
import Button from '@Core/components/Buttons/Button';
import IconRestore from '@Core/components/Icons/Actions/IconRestore';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import { SIZE, THEME } from '@Core/defaults/theme';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import ProductTemplateForm from '@Products/components/Form/ProductTemplateForm';
import getProductCompleteness from '@Products/services/getProductCompleteness.service';
import getProductTemplate from '@Products/services/getProductTemplate.service';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
    name: 'ProductTemplateTab',
    components: {
        Button,
        IconRestore,
        ProductTemplateForm,
        ResponsiveCenteredViewTemplate,
        RestoreAttributeParentModalForm: () => import('@Products/components/Modals/RestoreAttributeParentModalForm'),
        ProductCompleteness: () => import('@Products/components/Progress/ProductCompleteness'),
        TreeSelect: () => import('@Core/components/Inputs/Select/Tree/TreeSelect'),
        // Toggler: () => import('@Core/components/Inputs/Toggler/Toggler'),
    },
    mixins: [gridModalMixin],
    asyncData({ app: { $axios }, store, params: { id } }) {
        const { defaultLanguageCodeByPrivileges } = store.state.core;

        return Promise.all([
            getProductTemplate({ $axios, languageCode: defaultLanguageCodeByPrivileges, id }),
            getProductCompleteness({ $axios, languageCode: defaultLanguageCodeByPrivileges, id }),
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
        ...mapState('core', {
            defaultLanguageCodeByPrivileges: state => state.defaultLanguageCodeByPrivileges,
            languagesTree: state => state.languagesTree,
        }),
        ...mapState('product', {
            id: state => state.id,
        }),
        ...mapGetters('core', [
            'getRootOnLanguagesTree',
        ]),
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        languageOptions() {
            const { languagePrivileges } = this.user;

            return this.languagesTree.map(language => ({
                ...language,
                key: language.code,
                value: language.name,
                disabled: !languagePrivileges[language.code].read,
            }));
        },
        isUserAllowedToRestore() {
            const { languagePrivileges } = this.user;
            const { code } = this.language;

            return this.$hasAccess(['PRODUCT_UPDATE'])
                && languagePrivileges[code].edit
                && this.getRootOnLanguagesTree.code !== code;
        },
    },
    created() {
        this.language = this.languageOptions
            .find(languegeCode => languegeCode.code === this.defaultLanguageCodeByPrivileges);
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
        onRestoreDraftValues() {
            const { code: languageCode } = this.language;

            Promise.all([
                getProductCompleteness({
                    $axios: this.$axios,
                    languageCode,
                    id: this.id,
                }),
                this.getProductDraft({
                    languageCode,
                    id: this.id,
                }),
            ]).then(([completenessResponse]) => {
                this.completeness = completenessResponse;
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
