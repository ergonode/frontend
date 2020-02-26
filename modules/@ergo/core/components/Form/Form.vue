/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <form
        class="form"
        @submit.prevent>
        <slot />
    </form>
</template>

<script>
export default {
    name: 'Form',
};
</script>

<style lang="scss" scoped>
    .form {
        display: grid;
        grid-template-columns: 352px;
        grid-auto-flow: row;
        grid-row-gap: 16px;
        padding: 24px;
    }
</style>
