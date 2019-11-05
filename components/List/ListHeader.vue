/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="list-header">
        <div class="vertical-wrapper">
            <Button
                fab
                color="transparent"
                @click.native="onExpand">
                <template #prepend>
                    <IconArrowDouble :state="expendStateIcon" />
                </template>
            </Button>
            <span
                class="list-header__title font--medium-16-24"
                v-text="header" />
        </div>
        <slot />
    </div>
</template>

<script>
import { ARROW } from '~/defaults/icons';

export default {
    name: 'ListHeader',
    components: {
        Button: () => import('~/components/Buttons/Button'),
        IconArrowDouble: () => import('~/components/Icon/Arrows/IconArrowDouble'),
    },
    props: {
        header: {
            type: String,
            required: true,
        },
        isExpanded: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        expendStateIcon() {
            return ARROW.LEFT;
        },
    },
    methods: {
        onExpand() {
            this.$emit('expand', !this.isExpanded);
        },
    },
};
</script>

<style lang="scss" scoped>
    .list-header {
        position: relative;
        display: grid;
        grid-template-columns: auto max-content;
        row-gap: 12px;
        column-gap: 16px;
        align-items: center;
        padding: 12px;

        &__title {
            grid-column: 1;
            grid-row: 1;
            margin-left: 4px;
            color: $GRAPHITE_DARK;
        }
    }

    .vertical-wrapper {
        display: flex;
        align-items: center;
    }
</style>
