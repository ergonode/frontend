/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="product-attribute-binding-field">

    </div>
</template>

<script>
export default {
    name: 'ProductAttributeBindingField',
    props: {
        attribute: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .product-attribute-binding-field {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 8px;
    }
</style>
