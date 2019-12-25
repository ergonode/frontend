/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    components: {
        Page: () => import('@Core/components/Layout/Page'),
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
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
