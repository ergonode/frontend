/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LinkButton
        :title="title"
        :class="[{ 'link-button--disabled': !hasLink }]"
        @click.native="hasLink ? onClick(): null" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    isEmpty,
} from '@Core/models/objectWrapper';
import LinkButton from '@UI/components/LinkButton/LinkButton';

export default {
    name: 'LinkRelationButton',
    components: {
        LinkButton,
    },
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            required: true,
        },
        link: {
            type: Object,
            required: true,
        },
        namespace: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            routeLinks: {},
        };
    },
    computed: {
        namespaces() {
            return {
                PRODUCT: 'product',
                ATTRIBUTE: 'attribute',
                TEMPLATE: 'template',
            };
        },
        hasLink() {
            return !isEmpty(this.link);
        },
    },
    async mounted() {
        const extendedRouteLinks = await this.$getExtendMethod('@Media/components/Buttons/LinkRelationButton/routeLinks', {
            $this: this,
        });

        extendedRouteLinks.forEach((links) => {
            this.routeLinks = {
                ...this.routeLinks,
                ...links,
            };
        });
    },
    methods: {
        onClick() {
            const {
                href,
            } = this.link;
            const elements = href.split('/');
            const id = elements[elements.length - 1];

            if (!isEmpty(this.routeLinks) && this.routeLinks[this.namespace]) {
                this.$router.push({
                    name: this.routeLinks[this.namespace],
                    params: {
                        id,
                    },
                });
            } else {
                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'Unknown relation type',
                });
            }
        },
    },
};
</script>
<style lang="scss" scoped>
    .link-button--disabled {
        color: $GRAPHITE_LIGHT;
        text-decoration-color: $GRAPHITE_LIGHT;
        cursor: not-allowed;
    }
</style>
