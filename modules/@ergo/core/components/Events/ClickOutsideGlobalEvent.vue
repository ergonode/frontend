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
        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                window.addEventListener('click', this.onClickOutside);
            } else {
                window.removeEventListener('click', this.onClickOutside);
            }
        });

        this.observer.observe(this.$el);
    },
    beforeDestroy() {
        this.observer.disconnect();
    },
    methods: {
        onClickOutside(event) {
            this.$emit('clickOutside', this.$el.contains(event.target));
        },
    },
    render() {
        return this.$scopedSlots.default();
    },
};
</script>
