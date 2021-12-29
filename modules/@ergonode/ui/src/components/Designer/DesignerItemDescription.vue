/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="designer-item-description">
        <Tooltip
            class="designer-item-description__tooltip"
            :title="title"
            max-width="100%">
            <span
                v-if="title"
                class="designer-item-description__title"
                v-text="title" />
        </Tooltip>
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

        &__tooltip {
            display: flex;
            width: 100%;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_14_20;
        }

        &__title {
            flex: 1 1 auto;
            width: 0;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_14_20;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        &__subtitle {
            color: $GRAPHITE;
            font: $FONT_SEMI_BOLD_10_12;
        }
    }
</style>
