/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LinkButton
        :title="title"
        :disabled="!hasLink"
        @click.native="onClick" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    isEmpty,
} from '@Core/models/objectWrapper';

export default {
    name: 'LinkRelationButton',
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
        onClick(event) {
            if (!this.hasLink) {
                event.preventDefault();
                event.stopPropagation();
            } else {
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
                        message: this.$t('@Media.media.components.LinkRelationButton.errorMessage'),
                    });
                }
            }
        },
    },
};
</script>
