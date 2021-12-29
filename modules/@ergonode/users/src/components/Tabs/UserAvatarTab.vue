/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <UserAvatarForm
                :submit-title="$t('@Users._.submit')"
                :is-submitting="isSubmitting"
                :scope="scope"
                :errors="errors"
                :change-values="changeValues"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import UserAvatarForm from '@Users/components/Forms/UserAvatarForm';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UserAvatarTab',
    components: {
        UserAvatarForm,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState('authentication', [
            'user',
        ]),
        ...mapState('user', [
            'id',
        ]),
    },
    methods: {
        ...mapActions('authentication', [
            'getUser',
        ]),
        ...mapActions('user', [
            'updateUserAvatar',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);

            this.updateUserAvatar({
                scope: this.scope,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        async onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Users.profile.components.UserAvatarTab.updateAvatarSuccess'),
            });

            if (this.user.id === this.id) {
                await this.getUser({});
            }

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
