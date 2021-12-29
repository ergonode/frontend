/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="form-fieldset">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'FormFieldset',
};
</script>

<style lang="scss" scoped>
    .form-fieldset {
        & > * {
            padding: 4px;
        }
    }
</style>
