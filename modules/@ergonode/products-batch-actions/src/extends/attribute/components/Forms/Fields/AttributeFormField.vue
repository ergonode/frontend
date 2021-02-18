/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="attribute-form-field">
        <Preloader v-if="isPrefetchingData" />
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
        item: {
            type: Object,
            required: true,
        },
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
        justify-content: center;
        align-items: center;
        border: $BORDER_1_GREY;
        padding: 8px;
        background-color: $WHITESMOKE;
    }
</style>
