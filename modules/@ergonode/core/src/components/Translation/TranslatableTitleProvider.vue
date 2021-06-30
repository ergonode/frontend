/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
export default {
    name: 'TranslatableTitleProvider',
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    computed: {
        translation() {
            return this.title.charAt(0) === '@' ? this.$t(this.title) : this.title;
        },
    },
    render() {
        return this.$scopedSlots.default({
            translatableTitle: this.translation,
        });
    },
};
</script>
