/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UserPage
        :title="title"
        @save="onSave" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import deepmerge from 'deepmerge';
import {
    mapActions,
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'EditUser',
    components: {
        UserPage: () => import('@Users/components/Pages/UserPage'),
    },
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store,
        params,
    }) {
        await store.dispatch('users/getUserById', {
            userId: params.id,
        });
    },
    computed: {
        ...mapGetters('core', [
            'getActiveLanguageByCode',
            'getActiveLanguageByName',
        ]),
        ...mapState('authentication', {
            user: state => state.user,
        }),
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
        ...mapState('users', {
            id: state => state.id,
            avatarId: state => state.avatarId,
            email: state => state.email,
            firstName: state => state.firstName,
            lastName: state => state.lastName,
            language: state => state.language,
            password: state => state.password,
            passwordRepeat: state => state.passwordRepeat,
            isActive: state => state.isActive,
            role: state => state.role,
            languagePrivilegesCollection: state => state.languagePrivilegesCollection,
        }),
        title() {
            return `${this.firstName} ${this.lastName}`;
        },
    },
    destroyed() {
        this.clearStorage();
    },
    methods: {
        ...mapActions('users', [
            'clearStorage',
            'setLanguagePrivileges',
            'updateUser',
        ]),
        ...mapActions('authentication', [
            'getUser',
        ]),
        ...mapActions('grid', [
            'setDrafts',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        async onSave() {
            let isUpdated = false;
            const activeLanguages = Object.keys(this.languagePrivilegesCollection)
                .reduce((acc, languageCode) => {
                    const languages = acc;

                    if (this.getActiveLanguageByCode(languageCode).name) {
                        languages[languageCode] = this.languagePrivilegesCollection[languageCode];
                    }
                    return languages;
                }, {});
            const user = {
                firstName: this.firstName,
                lastName: this.lastName,
                language: this.getActiveLanguageByName(this.language).code,
                password: this.password,
                passwordRepeat: this.passwordRepeat,
                roleId: this.role,
                isActive: this.isActive,
                languagePrivilegesCollection: deepmerge(
                    activeLanguages,
                    this.drafts,
                ),
            };

            try {
                await this.$setLoader('footerButton');
                isUpdated = await this.updateUser({
                    id: this.id,
                    data: user,
                    avatarId: this.avatarId,
                });
            } catch (e) {
                this.onError(e.data);
            } finally {
                if (isUpdated !== false) {
                    this.removeValidationErrors();
                    this.$addAlert({
                        type: ALERT_TYPE.SUCCESS,
                        message: 'User updated',
                    });
                    this.setLanguagePrivileges(user.languagePrivilegesCollection);
                    this.setDrafts();

                    // TODO: Along Notification introduce - remove it from it - this solution is preventing from relogging to see newly edited data for user if edited user is logged one
                    if (this.user.id === this.id) {
                        this.getUser();
                    }
                }
                await this.$removeLoader('footerButton');
            }
        },
    },
};
</script>
