/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="description-wrapper">
        <span
            v-if="title"
            :class="['txt-fixed', 'l-spacing--half', titleTypo, titleColor]"
            v-text="title" />
        <span
            v-if="subtitle"
            :class="['txt-fixed', subtitleTypo, subtitleColor]"
            v-text="subtitle" />
    </div>
</template>

<script>

export default {
    name: 'ListElementDescription',
    props: {
        title: {
            type: String,
            required: false,
            default: null,
        },
        subtitle: {
            type: String,
            required: false,
            default: null,
        },
        titleTypo: {
            type: String,
            required: false,
            default: 'typo-label',
        },
        subtitleTypo: {
            type: String,
            required: false,
            default: 'typo-subtitle',
        },
        titleColor: {
            type: String,
            required: false,
            default: 'txt--light-graphite',
        },
        subtitleColor: {
            type: String,
            required: false,
            default: 'txt--dark-graphite',
        },
    },
};
</script>

<style lang="scss" scoped>
    .description-wrapper {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        overflow: hidden;
    }
</style>
