/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :title="$t('core.buttons.submit')"
        @click.native="onSubmit">
        <template
            v-if="isSubmitting"
            #prepend="{ color }">
            <IconSpinner :fill-color="color" />
        </template>
    </Button>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import Button from '@UI/components/Button/Button';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'UpdateProductsAttachmentButton',
    components: {
        Button,
        IconSpinner,
    },
    props: {
        skus: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    methods: {
        ...mapActions('product', [
            'addBySku',
            'removeProductChildren',
        ]),
        async onSubmit() {
            this.isSubmitting = true;

            const requests = [];
            const skusKeys = Object.keys(this.skus);
            const skus = [];

            skusKeys.forEach((key) => {
                const {
                    sku,
                    value,
                } = this.skus[key];

                if (value) {
                    skus.push(sku);
                } else {
                    requests.push(this.removeProductChildren({
                        childrenId: key,
                        skus: sku,
                    }));
                }
            });

            if (skus.length) {
                requests.push(this.addBySku({
                    skus,
                }));
            }

            await Promise.all(requests);

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Products attachment have been updated',
            });

            this.isSubmitting = false;

            if (skusKeys.length) {
                const event = new CustomEvent('products-attachment-updated');

                document.documentElement.dispatchEvent(event);
            }

            this.$emit('updated');
        },
    },
};
</script>
