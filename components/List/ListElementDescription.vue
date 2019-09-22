/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <div class="description-wrapper">
        <span
            v-if="props.title"
            :class="['txt-fixed', 'l-spacing--half', props.titleTypo, props.titleColor]"
            v-text="props.title" />
        <span
            v-if="props.subtitle"
            :class="['txt-fixed', props.subtitleTypo, props.subtitleColor]"
            v-text="props.subtitle" />
    </div>
</template>

<script>

export default {
    name: 'ListElementDescription',
    props: {
        title: {
            type: String,
            default: null,
        },
        subtitle: {
            type: String,
            default: null,
        },
        titleTypo: {
            type: String,
            default: 'typo-label',
        },
        subtitleTypo: {
            type: String,
            default: 'typo-subtitle',
        },
        titleColor: {
            type: String,
            default: 'txt--graphite',
        },
        subtitleColor: {
            type: String,
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
