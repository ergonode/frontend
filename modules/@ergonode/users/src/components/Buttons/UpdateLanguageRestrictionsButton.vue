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
    name: 'UpdateLanguageRestrictionsButton',
    components: {
        Button,
        IconSpinner,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    methods: {
        ...mapActions('user', [
            'updateUser',
            '__setState',
        ]),
        ...mapActions('feedback', [
            'onError',
            'removeScopeErrors',
            'markChangeValuesAsSaved',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.updateUser({
                scope: this.scope,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('user.message.updateLanguageSuccess'),
            });

            this.__setState({
                key: 'drafts',
                value: {},
            });

            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
