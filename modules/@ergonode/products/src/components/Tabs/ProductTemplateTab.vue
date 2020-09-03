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
                    :size="smallSize"
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
import Button from '@Core/components/Button/Button';
import IconRestore from '@Core/components/Icons/Actions/IconRestore';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import ProductTemplateForm from '@Products/components/Form/ProductTemplateForm';
import PRIVILEGES from '@Products/config/privileges';
import getProductCompleteness from '@Products/services/getProductCompleteness.service';
import getProductTemplate from '@Products/services/getProductTemplate.service';
import {
    mapActions,
    mapGetters,
    mapState,
} from 'vuex';

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
    mixins: [
        gridModalMixin,
    ],
    asyncData({
        app: {
            $axios,
        }, store, params: {
            id,
        },
    }) {
        const {
            defaultLanguageCode,
        } = store.state.core;

        return Promise.all([
            getProductTemplate({
                $axios,
                languageCode: defaultLanguageCode,
                id,
            }),
            getProductCompleteness({
                $axios,
                languageCode: defaultLanguageCode,
                id,
            }),
        ]).then(([
            templateResponse,
            completenessResponse,
        ]) => ({
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
            languagePrivileges: state => state.user.languagePrivileges,
        }),
        ...mapState('core', {
            defaultLanguageCode: state => state.defaultLanguageCode,
            languagesTree: state => state.languagesTree,
        }),
        ...mapState('product', {
            id: state => state.id,
        }),
        ...mapGetters('core', [
            'rootLanguage',
        ]),
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        languageOptions() {
            return this.languagesTree.map(language => ({
                ...language,
                key: language.code,
                value: language.name,
                disabled: this.languagePrivileges[language.code]
                    ? !this.languagePrivileges[language.code].read
                    : true,
            }));
        },
        isUserAllowedToRestore() {
            const {
                code,
            } = this.language;

            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ])
                && this.languagePrivileges[code].edit
                && this.rootLanguage.code !== code;
        },
    },
    created() {
        this.language = this.languageOptions
            .find(languageCode => languageCode.code === this.defaultLanguageCode);
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
            ]).then(([
                templateResponse,
                completenessResponse,
            ]) => {
                this.elements = templateResponse.elements;
                this.completeness = completenessResponse;
                this.language = value;
            });
        },
        onRestoreDraftValues() {
            const {
                code: languageCode,
            } = this.language;

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
            ]).then(([
                completenessResponse,
            ]) => {
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
