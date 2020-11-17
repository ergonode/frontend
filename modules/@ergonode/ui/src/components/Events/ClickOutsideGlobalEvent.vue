/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <IntersectionObserver @intersect="onIntersect">
        <slot />
    </IntersectionObserver>
</template>

<script>
import IntersectionObserver from '@UI/components/Observers/IntersectionObserver';
import {
    getPositionForBrowser,
    isMouseInsideElement,
} from '@UI/models/dragAndDrop/helpers';

export default {
    name: 'ClickOutsideGlobalEvent',
    components: {
        IntersectionObserver,
    },
    beforeDestroy() {
        window.removeEventListener('click', this.onClickOutside);
    },
    methods: {
        onIntersect(isIntersecting) {
            this.$nextTick(() => {
                if (isIntersecting) {
                    window.addEventListener('click', this.onClickOutside);
                } else {
                    window.removeEventListener('click', this.onClickOutside);
                }
            });
        },
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
};
</script>
