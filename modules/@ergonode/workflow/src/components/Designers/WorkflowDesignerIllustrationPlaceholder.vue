/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="workflow-illustration-placeholder">
        <img
            class="workflow-illustration-placeholder__image"
            :src="url"
            alt="Workflow illustration placeholder">
    </div>
</template>

<script>
export default {
    name: 'WorkflowDesignerIllustrationPlaceholder',
    computed: {
        url() {
            return require('@UI/assets/images/placeholders/man_placeholder.svg');
        },
    },
};
</script>

<style lang="scss" scoped>
    .workflow-illustration-placeholder {
        flex: 1 1 100%;
        margin-left: 32px;
        margin-top: 32px;

        &__image {
            width: 290px;
        }
    }
</style>
