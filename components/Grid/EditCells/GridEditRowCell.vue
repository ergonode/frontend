/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <nuxt-link
        class="action-link"
        :to="actionLink"
        aria-label="edit">
        <Icon
            icon="sprite-system system-edit--deactive"
            size="medium" />
    </nuxt-link>
</template>

<script>
export default {
    name: 'GridEditRowCell',
    components: {
        Icon: () => import('~/components/Icon/Icon'),
    },
    props: {
        actionPath: {
            type: String,
            required: true,
        },
        params: {
            type: Object,
            required: true,
        },
        isSelected: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    watch: {
        isSelected() {
            this.$router.push({ name: this.actionPath, params: this.params });
        },
    },
    computed: {
        actionLink() {
            return {
                name: this.actionPath,
                params: this.params,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .action-link {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        padding: 8px;
    }
</style>
