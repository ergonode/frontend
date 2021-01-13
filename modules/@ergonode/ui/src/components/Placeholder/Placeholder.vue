/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="classes"
        :style="placeholderStyles">
        <div class="placeholder__description">
            <span
                v-if="title"
                class="placeholder__title"
                v-text="title" />
            <span
                v-if="subtitle"
                class="placeholder__subtitle"
                v-text="subtitle" />
        </div>
        <div class="placeholder__action">
            <slot name="action" />
        </div>
    </div>
</template>

<script>
import {
    ORIENTATION,
} from '@Core/defaults/layout';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'Placeholder',
    props: {
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        /**
         * Determines position of body components; vertical / horizontal
         */
        orientation: {
            type: String,
            default: ORIENTATION.VERTICAL,
            validator: value => Object.values(ORIENTATION).indexOf(value) !== -1,
        },
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: 'Nothing to see here',
        },
        /**
         * The subtitle of the component
         */
        subtitle: {
            type: String,
            default: 'There are no records in the system.',
        },
        /**
         * The url to background image of placeholder
         */
        bgUrl: {
            type: String,
            default: '',
        },
        /**
         * Color of background
         */
        color: {
            type: String,
            default: WHITE,
            validator: value => /^#([A-Fa-f0-9]{6})$/.test(value),
        },
    },
    computed: {
        classes() {
            return [
                'placeholder',
                `placeholder--${this.size}`,
                `placeholder--${this.orientation}`,
            ];
        },
        placeholderStyles() {
            if (!this.bgUrl) {
                return {
                    backgroundColor: this.color,
                };
            }

            return {
                background: `${this.color} url(${this.bgUrl}) no-repeat right bottom`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .placeholder {
        $placeholder: &;

        flex: 1;
        box-sizing: border-box;
        color: $GRAPHITE_DARK;

        &--small {
            padding: 24px;

            #{$placeholder}__title {
                font: $FONT_SEMI_BOLD_20_24;
            }

            #{$placeholder}__description {
                grid-template-columns: 228px;
            }
        }

        &--regular {
            padding: 40px 40px 0;

            #{$placeholder}__title {
                font: $FONT_SEMI_BOLD_24_32;
            }

            #{$placeholder}__description {
                grid-template-columns: 272px;
            }
        }

        &--vertical {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 64px 0 0;
        }

        &__subtitle {
            font: $FONT_MEDIUM_14_20;
        }

        &__description {
            display: grid;
            grid-auto-flow: row;
            row-gap: 8px;
            word-break: break-word;
        }

        &__action {
            margin-top: 16px;
        }
    }
</style>
