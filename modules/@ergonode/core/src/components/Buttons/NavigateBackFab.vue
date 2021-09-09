/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Fab @click.native="onBack">
        <template #icon="{ color }">
            <IconArrowPointer :fill-color="color" />
        </template>
    </Fab>
</template>

<script>
import Fab from '@UI/components/Fab/Fab';
import IconArrowPointer from '@UI/components/Icons/Arrows/IconArrowPointer';

export default {
    name: 'NavigateBackFab',
    components: {
        IconArrowPointer,
        Fab,
    },
    props: {
        previousRoute: {
            type: Object,
            default: null,
        },
    },
    methods: {
        onBack() {
            if (this.previousRoute) {
                this.$router.push(this.previousRoute);

                return;
            }

            const {
                breadcrumbs,
            } = this.$route.meta;

            if (!breadcrumbs) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(`Route ${this.$route.fullPath} has no breadcrumbs initialised!`);
                }

                return;
            }

            const routerPush = {
                name: breadcrumbs[breadcrumbs.length - 1].routeName,
            };

            if (breadcrumbs[breadcrumbs.length - 1].id) {
                routerPush.params = {
                    id: this.$route.params[breadcrumbs[breadcrumbs.length - 1].id],
                };
            }

            this.$router.push(routerPush);
        },
    },
};
</script>
