/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    components: {
        Page: () => import('@Core/components/Layout/Page'),
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        HorizontalTabBar: () => import('@Core/components/Tab/HorizontalTabBar'),
        Footer: () => import('@Core/components/ReusableFooter/Footer'),
        Button: () => import('@Core/components/Buttons/Button'),
        IconDelete: () => import('@Core/components/Icons/Actions/IconDelete'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    methods: {
        onDismiss() {
            this.$emit('dismiss');
        },
        onRemove() {
            this.$emit('remove');
        },
        onSave() {
            this.$emit('save');
        },
    },
};
