/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :title="$t('@Products.product.components.EditProductTemplateButton.title')"
        :size="smallSize"
        @click.native="onNavigateToTemplate" />
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    ROUTE_NAME,
} from '@Templates/config/routes';
import Button from '@UI/components/Button/Button';
import {
    mapState,
} from 'vuex';

export default {
    name: 'EditProductTemplateButton',
    components: {
        Button,
    },
    computed: {
        ...mapState('product', [
            'template',
        ]),
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        onNavigateToTemplate() {
            this.$router.push({
                name: ROUTE_NAME.PRODUCT_TEMPLATE_EDIT_DESIGNER,
                params: {
                    id: this.template,
                },
            });
        },
    },
};
</script>
