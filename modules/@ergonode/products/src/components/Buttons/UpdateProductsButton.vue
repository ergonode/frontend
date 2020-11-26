/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :title="$t('core.buttons.submit')"
        :disabled="!isAllowedToUpdate"
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
import PRIVILEGES from '@Products/config/privileges';
import Button from '@UI/components/Button/Button';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'UpdateProductsButton',
    components: {
        Button,
        IconSpinner,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        drafts: {
            type: Object,
            default: () => ({}),
        },
        columns: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    methods: {
        ...mapActions('feedback', [
            'onError',
            'removeScopeErrors',
            'markChangeValuesAsSaved',
        ]),
        ...mapActions('product', [
            'updateProductsValues',
        ]),
        async onSubmit() {
            if (this.isSubmitting) {
                return;
            }

            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.updateProductsValues({
                scope: this.scope,
                drafts: this.drafts,
                columns: this.columns,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Products have been updated',
            });

            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);

            this.$emit('updated');
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
