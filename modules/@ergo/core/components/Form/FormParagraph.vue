/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <p
        class="form-paragraph"
        v-text="props.text" />
</template>

<script>
export default {
    name: 'FormParagraph',
    props: {
        text: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .form-paragraph {
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_14_20;
    }
</style>
