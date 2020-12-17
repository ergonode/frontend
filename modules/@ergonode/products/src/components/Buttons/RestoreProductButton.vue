/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :theme="secondaryTheme"
        :size="smallSize"
        :title="$t('core.buttons.restore')"
        :disabled="!isAllowedToRestore"
        @click.native="onShowModal">
        <template #prepend="{ color }">
            <IconRestore :fill-color="color" />
        </template>
        <RestoreProductAttributesModalForm
            v-if="isModalVisible"
            :language="language"
            :elements="elements"
            @restored="onRestored"
            @close="onCloseModal" />
    </Button>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import PRIVILEGES from '@Products/config/privileges';
import Button from '@UI/components/Button/Button';
import IconRestore from '@UI/components/Icons/Actions/IconRestore';
import {
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'RestoreProductButton',
    components: {
        Button,
        IconRestore,
        RestoreProductAttributesModalForm: () => import('@Products/components/Modals/RestoreProductAttributesModalForm'),
    },
    props: {
        language: {
            type: Object,
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
    methods: {
        onShowModal() {
            this.isModalVisible = true;
        },
        onCloseModal() {
            this.isModalVisible = false;
        },
        onRestored() {
            this.onCloseModal();
            this.$emit('restored');
        },
    },
};
</script>
