/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li
        :class="['list-element', { 'list-element--selected': isSelected }]"
        @mouseover="onMouseOver"
        @mouseout="onMouseOut">
        <NuxtLink
            class="list-element__link"
            :to="{ path: item.routing }">
            <Icon
                class="link-icon"
                :icon="`sprite-menu ${elementIcon}`"
                size="medium" />
            <span
                class="link-text"
                v-text="item.title" />
        </NuxtLink>
    </li>
</template>

<script>
export default {
    name: 'MenuListElement',
    components: {
        Icon: () => import('~/components/Icon/Icon'),
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isHover: false,
        };
    },
    computed: {
        elementIcon() {
            let iconColor = 'deactive';
            if (this.isHover) iconColor = 'selected';
            if (this.isSelected) iconColor = 'active';
            return `menu-${this.item.icon}--${iconColor}`;
        },
        isSelected() {
            return this.$route.path.includes(this.item.routing);
        },
    },
    methods: {
        onMouseOver() {
            if (!this.isSelected) this.isHover = true;
        },
        onMouseOut() {
            this.isHover = false;
        },
    },

};
</script>
