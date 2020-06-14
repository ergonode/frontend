/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
export default {
    name: 'GridTableEditTriggerCell',
    props: {
        triggerKeyCode: {
            type: Number,
            default: 13,
        },
    },
    mounted() {
        this.$slots.default[0].context.$el.addEventListener('keydown', this.onKeyDown);
    },
    beforeDestroy() {
        this.$slots.default[0].context.$el.removeEventListener('keydown', this.onKeyDown);
    },
    methods: {
        onKeyDown({ keyCode }) {
            if (keyCode === this.triggerKeyCode) {
                this.$emit('edit');
            }
        },
    },
    render() {
        return this.$scopedSlots.default();
    },
};
</script>
