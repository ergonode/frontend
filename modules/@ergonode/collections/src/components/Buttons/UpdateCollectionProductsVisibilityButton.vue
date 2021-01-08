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
    name: 'UpdateCollectionProductsVisibilityButton',
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
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    methods: {
        ...mapActions('feedback', [
            'onError',
            'removeScopeErrors',
            'markChangeValuesAsSaved',
        ]),
        ...mapActions('collection', [
            'updateCollectionProductsVisibility',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.updateCollectionProductsVisibility({
                scope: this.scope,
                drafts: this.drafts,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        async onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Product visibilities in collection have been updated',
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
