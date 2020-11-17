/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
import {
    getPositionForBrowser,
    isMouseInsideElement,
} from '@UI/models/dragAndDrop/helpers';

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
                xPos,
                yPos,
            } = getPositionForBrowser(event);
            const isClickedOutside = !isMouseInsideElement(this.$el, xPos, yPos);

            this.$emit('click-outside', {
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
