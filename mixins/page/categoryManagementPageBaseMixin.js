/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    components: {
        Page: () => import('~/core/components/Layout/Page'),
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        HorizontalTabBar: () => import('~/core/components/Tab/HorizontalTabBar'),
        PrependIconButton: () => import('~/core/components/Buttons/PrependIconButton'),
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
    },
};
