/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
export default {
    name: 'GridEditNavigationCell',
    props: {
        keyCode: {
            type: Number,
            default: 13,
        },
    },
    mounted() {
        if (this.$slots.default[0].elm) {
            this.$slots.default[0].elm.addEventListener(
                'keydown',
                this.onKeyDown,
                true,
            );
        }
    },
    beforeDestroy() {
        if (this.$slots.default[0].elm) {
            this.$slots.default[0].elm.removeEventListener(
                'keydown',
                this.onKeyDown,
                true,
            );
        }
    },
    methods: {
        onKeyDown(event) {
            const {
                keyCode,
            } = event;

            if (keyCode === this.keyCode || keyCode === 27) {
                this.$emit('edit');
            } else if (keyCode === 9) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
    },
    render() {
        return this.$scopedSlots.default();
    },
};
</script>
