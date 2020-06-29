/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
export default {
    name: 'ClickOutsideGlobalEvent',
    data() {
        return {
            observer: null,
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    window.addEventListener('click', this.onClickOutside);
                } else {
                    window.removeEventListener('click', this.onClickOutside);
                }
            });

            this.observer.observe(this.$el);
        });
    },
    beforeDestroy() {
        window.removeEventListener('click', this.onClickOutside);
        this.observer.disconnect();
    },
    methods: {
        onClickOutside(event) {
            const {
                top, left, width, height,
            } = this.$el.getBoundingClientRect();
            const {
                pageX, pageY,
            } = event;
            const isClickedOutside = !(pageX > left
                && pageX < left + width
                && pageY > top
                && pageY < top + height);

            this.$emit('clickOutside', {
                event,
                isClickedOutside,
            });
        },
    },
    render() {
        return this.$scopedSlots.default();
    },
};
</script>
