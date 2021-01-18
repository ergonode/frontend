/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
import {
    isEmpty,
} from '@Core/models/objectWrapper';

export default {
    name: 'ParagraphWithLinks',
    props: {
        paragraph: {
            type: String,
            required: true,
        },
        links: {
            type: Object,
            default: () => ({}),
        },
    },
    render(createElement) {
        let paragraphContent = this.paragraph;

        if (!isEmpty(this.links)) {
            paragraphContent = this.paragraph.split(' ').map((word) => {
                const regex = /\[\[([a-zA-Z1-9_]+)\]\]/g;
                const key = word.replace(regex, '$1');

                if (regex.test(word) && this.links[key]) {
                    const {
                        title,
                        action,
                    } = this.links[key];

                    return createElement('span', {
                        class: 'paragraph-with-links__link',
                        on: {
                            click: action,
                        },
                    }, ` ${title}`);
                }
                return ` ${word}`;
            });
        }

        return createElement('p', {
            class: 'paragraph-with-links',
        }, paragraphContent);
    },
};
</script>

<style lang="scss" scoped>
    .paragraph-with-links {
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_14_20;

        &__link {
            text-decoration: underline;
            cursor: pointer;
        }
    }
</style>
