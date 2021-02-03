/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
import {
    isEmpty,
} from '@Core/models/objectWrapper';

export default {
    name: 'Paragraph',
    props: {
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

        return createElement('p', {
            class: 'paragraph',
        }, paragraphContent);
    },
};
</script>

<style lang="scss" scoped>
    .paragraph {
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_14_20;
    }
</style>
