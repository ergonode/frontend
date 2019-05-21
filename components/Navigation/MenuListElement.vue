/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li
        :class="['list-element', { 'list-element--selected': isSelected(action) }]"
        @mouseover="mouseover(action)"
        @mouseout="mouseout(action)">
        <nuxt-link
            class="list-element__link"
            :to="createNuxtLink(action)">
            <Icon
                class="link-icon"
                :icon="`sprite-menu ${setIcon}`"
                size="medium" />
            <span class="link-text">
                {{ title }}
            </span>
        </nuxt-link>
    </li>
</template>

<script>
export default {
    name: 'MenuListElement',
    components: {
        Icon: () => import('~/components/Icon/Icon'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        selectedElement: {
            type: String,
            required: false,
            default: '',
        },
    },
    data: () => ({
        isHover: false,
    }),
    computed: {
        setIcon() {
            let iconColor = 'deactive';
            if (this.isHover) iconColor = 'selected';
            if (this.selectedElement === this.action) iconColor = 'active';
            return `menu-${this.icon}--${iconColor}`;
        },
    },
    methods: {
        mouseover(title) {
            if (!this.isSelected(title)) this.isHover = true;
        },
        mouseout() {
            this.isHover = false;
        },
        isSelected(item) {
            return item === this.selectedElement;
        },
        createNuxtLink(target) {
            return {
                path: target,
            };
        },
    },

};
</script>
