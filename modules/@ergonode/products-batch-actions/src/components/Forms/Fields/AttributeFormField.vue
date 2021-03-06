/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="attribute-form-field">
        <Preloader v-if="isPrefetchingData" />
        <slot
            v-else
            name="attribute" />
    </div>
</template>

<script>
import Preloader from '@UI/components/Preloader/Preloader';

export default {
    name: 'AttributeFormField',
    components: {
        Preloader,
    },
    props: {
        isPrefetchingData: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .attribute-form-field {
        display: flex;
        align-items: center;
    }
</style>
