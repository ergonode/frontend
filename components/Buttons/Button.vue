/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        v-ripple.mousedown.400="rippleColor"
        :disabled="disabled"
        :class="buttonTypeClasses">
        <Icon
            v-if="icon"
            class="btn__icon"
            :icon="icon"
            size="medium" />
        <span
            v-if="title"
            :class="titleTypo"
            v-text="title" />
    </div>
</template>

<script>
import borderMixin from '~/mixins/borderMixin';
import sizeMixin from '~/mixins/sizeMixin';

export default {
    name: 'Button',
    components: {
        Icon: () => import('~/components/Icon/Icon'),
    },
    mixins: [borderMixin, sizeMixin],
    props: {
        rippleColor: {
            type: String,
            required: false,
            default: 'rgba(255, 255, 255, 0.35)',
        },
        title: {
            type: String,
            required: false,
            default: null,
        },
        color: {
            type: String,
            required: false,
            default: 'primary',
        },
        theme: {
            type: String,
            required: false,
            default: 'light',
        },
        icon: {
            type: String,
            required: false,
            default: null,
        },
        disabled: {
            type: Boolean,
            required: false,
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
