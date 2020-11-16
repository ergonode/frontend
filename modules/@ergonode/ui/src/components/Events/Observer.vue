/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<script>
export default {
    name: 'Observer',
    props: {
        options: {
            type: Object,
            default: () => ({}),
        },
        observeOnce: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            observer: null,
        };
    },
    mounted() {
        this.observer = new IntersectionObserver(([
            entry,
        ]) => {
            if (!entry) {
                return;
            }

            this.$emit('intersect', entry.isIntersecting);

            if (entry.isIntersecting && this.observeOnce) {
                this.observer.disconnect();
                this.observer = null;
            }
        }, this.options);

        this.observer.observe(this.$el);
    },
    beforeDestroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    },
    render() {
        return this.$scopedSlots.default();
    },
};
</script>
