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
                const regex = /\[\[([a-zA-Z1-9_]+)\]\]/g;
                const key = word.replace(regex, '$1');

                if (regex.test(word) && this.$slots[key]) {
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
