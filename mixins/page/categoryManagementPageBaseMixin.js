/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import PrependIconButton from '@Core/components/Buttons/PrependIconButton';
import TitleBar from '@Core/components/TitleBar/TitleBar';

export default {
    components: {
        PrependIconButton,
        TitleBar,
        Page: () => import('@Core/components/Layout/Page'),
        HorizontalTabBar: () => import('@Core/components/Tab/HorizontalTabBar'),
        Footer: () => import('~/components/ReusableFooter/Footer'),
        Button: () => import('@Core/components/Buttons/Button'),
        IconDelete: () => import('~/components/Icon/Actions/IconDelete'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        isEdit: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onDismiss() {
            this.$emit('dismiss');
        },
        onRemove() {
            this.$emit('remove');
        },
        onCreate() {
            this.$emit('create');
        },
        onSave() {
            this.$emit('save');
        },
        onUpdate() {
            if (this.isEdit) this.onSave();
            else this.onCreate();
        },
    },
};
