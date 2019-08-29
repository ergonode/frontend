/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        :disabled="disabled"
        :class="buttonTypeClasses"
        :aria-label="title">
        <slot name="prepend" />
        <span
            v-if="title"
            :class="titleTypo"
            v-text="title" />
    </button>
</template>

<script>
import borderMixin from '~/mixins/borderMixin';
import sizeMixin from '~/mixins/sizeMixin';

export default {
    name: 'Button',
    mixins: [borderMixin, sizeMixin],
    props: {
        title: {
            type: String,
            default: null,
        },
        color: {
            type: String,
            default: 'primary',
        },
        theme: {
            type: String,
            default: 'light',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        titleTypo() {
            return this.small
                ? 'typo-btn--xs'
                : 'typo-btn l-spacing--half';
        },
        buttonTypeClasses() {
            return [
                'btn',
                'theme',
                `theme--${this.theme}`,
                this.color,
                {
                    'btn--small': this.small,
                    'btn--large': this.large,
                    'btn--rounded': this.rounded,
                    'btn--fab': this.fab,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/button.scss";
</style>
