/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="designer-item-description">
        <span
            v-if="title"
            class="designer-item-description__title"
            v-text="title" />
        <span
            v-if="subtitle"
            class="designer-item-description__subtitle"
            v-text="subtitle" />
    </div>
</template>

<script>
export default {
    name: 'DesignerItemDescription',
    props: {
        title: {
            type: String,
            default: '',
        },
        subtitle: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .designer-item-description {
        display: flex;
        flex: 1;
        flex-direction: column;
        margin-left: 8px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        &__title {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_14_20;
        }

        &__subtitle {
            color: $GRAPHITE;
            font: $FONT_SEMI_BOLD_10_12;
        }

    }
</style>
