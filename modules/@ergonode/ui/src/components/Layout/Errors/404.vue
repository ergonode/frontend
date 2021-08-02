/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="error-404">
        <div class="error-404__placeholder">
            <Placeholder
                :bg-url="bgUrl"
                :size="largeSize"
                title="Page not found"
                subtitle="The link you clicked may be broken or the page may have been removed."
                :orientation="horizontalOrientation">
                <template #action>
                    <Button
                        title="Go to dashboard"
                        :size="smallSize"
                        @click.native="$router.push({ name: 'dashboard' })" />
                </template>
            </Placeholder>
        </div>
    </div>
</template>

<script>
import {
    ORIENTATION,
} from '@Core/defaults/layout';
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'Error404',
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        largeSize() {
            return SIZE.LARGE;
        },
        horizontalOrientation() {
            return ORIENTATION.HORIZONTAL;
        },
        bgUrl() {
            return require('@UI/assets/images/placeholders/error-pages/404.svg');
        },
    },
};
</script>

<style lang="scss" scoped>
    .error-404 {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        background-color: $WHITE;

        &__placeholder {
            display: flex;
            width: 845px;
            height: 346px;
            padding-top: 168px;
        }
    }
</style>
