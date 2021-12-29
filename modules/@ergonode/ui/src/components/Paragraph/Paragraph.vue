/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    isEmpty,
} from '@Core/models/objectWrapper';

export default {
    name: 'Paragraph',
    props: {
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        title: {
            type: String,
            required: true,
        },
    },
    render(createElement) {
        let paragraphContent = this.title;

        if (!isEmpty(this.$slots)) {
            paragraphContent = this.title.split(' ').map((word) => {
                // pattern to search `[[slot_name]]`
                const regex = /\[\[([0-9a-zA-Z]+)\]\]/g;

                if (regex.test(word)) {
                    const key = word.replace(/\[|\]/g, '');

                    return this.$slots[key];
                }
                return ` ${word} `;
            });
        }
        return createElement('div', {
            class: [
                'paragraph',
                `paragraph--${this.size}`,
            ],
        }, [
            this.$slots.prepend,
            createElement('p', {
                class: 'paragraph__content',
            }, paragraphContent),
            this.$slots.append,
        ]);
    },
};
</script>

<style lang="scss" scoped>
    .paragraph {
        display: grid;
        grid-auto-flow: column;
        justify-content: flex-start;
        align-items: flex-start;
        column-gap: 10px;

        &__content {
            color: $GRAPHITE_DARK;
        }

        &--small &__content {
            font: $FONT_MEDIUM_12_16;
        }

        &--regular &__content {
            font: $FONT_MEDIUM_14_20;
        }
    }
</style>
