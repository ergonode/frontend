/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LinkButton
        :title="title"
        @click.native="onClick" />
</template>

<script>
import {
    ROUTE_NAME as ATTRIBUTES_ROUTE_NAME,
} from '@Attributes/config/routes';
import {
    ROUTE_NAME as PRODUCTS_ROUTE_NAME,
} from '@Products/config/routes';
import {
    ROUTE_NAME as PRODUCT_TEMPLATE_ROUTE_NAME,
} from '@Templates/config/routes';
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
    computed: {
        namespaces() {
            return {
                PRODUCT: 'product',
                ATTRIBUTE: 'attribute',
                TEMPLATE: 'template',
            };
        },
    },
    methods: {
        onClick() {
            const {
                href,
            } = this.link;
            const elements = href.split('/');
            const id = elements[elements.length - 1];

            switch (this.namespace) {
            case this.namespaces.PRODUCT:
                this.$router.push({
                    name: PRODUCTS_ROUTE_NAME.PRODUCT_EDIT_GENERAL,
                    params: {
                        id,
                    },
                });
                break;
            case this.namespaces.TEMPLATE:
                this.$router.push({
                    name: PRODUCT_TEMPLATE_ROUTE_NAME.PRODUCT_TEMPLATE_EDIT_GENERAL,
                    params: {
                        id,
                    },
                });
                break;
            default:
                this.$router.push({
                    name: ATTRIBUTES_ROUTE_NAME.ATTRIBUTE_EDIT_GENERAL,
                    params: {
                        id,
                    },
                });
                break;
            }
        },
    },
};
</script>
