/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :theme="secondaryTheme"
        :size="smallSize"
        :title="$t('@Products._.restore')"
        :disabled="!isAllowedToRestore"
        @click.native="onShowModal">
        <template #prepend="{ color }">
            <IconRestore :fill-color="color" />
        </template>
        <RestoreProductAttributesModalForm
            v-if="isModalVisible"
            :language-code="languageCode"
            :elements="elements"
            :product-template-scope="productTemplateScope"
            @close="onCloseModal" />
    </Button>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import PRIVILEGES from '@Products/config/privileges';
import {
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'RestoreProductButton',
    components: {
        RestoreProductAttributesModalForm: () => import('@Products/components/Modals/RestoreProductAttributesModalForm'),
    },
    props: {
        productTemplateScope: {
            type: String,
            default: '',
        },
        languageCode: {
            type: String,
            required: true,
        },
        elements: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    computed: {
        ...mapState('authentication', {
            languagePrivileges: state => state.user.languagePrivileges,
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
        isAllowedToRestore() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ])
                && this.languagePrivileges[this.languageCode].edit
                && this.rootLanguage.code !== this.languageCode;
        },
    },
    methods: {
        onShowModal() {
            this.isModalVisible = true;
        },
        onCloseModal() {
            this.isModalVisible = false;
        },
    },
};
</script>
