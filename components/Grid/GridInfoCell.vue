/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <div class="info-cell">
        <span
            class="info-cell__text"
            v-text="props.value" />
        <Icon
            v-if="props.isSelectKind && props.isEditable"
            icon="arrow-triangle" />
    </div>
</template>

<script>

export default {
    name: 'GridInfoCell',
    components: {
        Icon: () => import('~/components/Icon/Icon'),
    },
    props: {
        value: {
            type: String,
            required: true,
        },
        isSelectKind: {
            type: Boolean,
            required: false,
            default: false,
        },
        isEditable: {
            type: Boolean,
            required: true,
        },
    },
};
</script>

<style lang="scss">
    .info-cell {
        position: relative;
        display: flex;
        flex: 1;
        justify-content: left;
        align-items: center;
        padding: 8px;
        user-select: none;

        &__text {
            @include setFont(medium, small, regular, $darkGraphite);
            flex: 1;
            width: 0;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            white-space: nowrap;
        }
    }
</style>
