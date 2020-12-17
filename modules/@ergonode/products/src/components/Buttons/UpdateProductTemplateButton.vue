/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :title="$t('product.buttons.submit')"
        :floating="{ bottom: '24px', right: '24px' }"
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
    mapState,
} from 'vuex';

export default {
    name: 'UpdateProductTemplateButton',
    components: {
        Button,
        IconSpinner,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        attributes: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState('product', [
            'drafts',
        ]),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    methods: {
        ...mapActions('feedback', [
            'onError',
            'markChangeValuesAsSaved',
        ]),
        ...mapActions('product', [
            'updateProductValues',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.updateProductValues({
                scope: this.scope,
                attributes: this.attributes,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Product has been updated',
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
