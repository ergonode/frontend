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
        await store.dispatch('user/getUser', {
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
        ...mapState('user', {
            id: state => state.id,
            email: state => state.email,
            firstName: state => state.firstName,
            lastName: state => state.lastName,
            language: state => state.language,
            password: state => state.password,
            passwordRepeat: state => state.passwordRepeat,
            isActive: state => state.isActive,
            role: state => state.role,
            drafts: state => state.drafts,
            languagePrivilegesCollection: state => state.languagePrivilegesCollection,
        }),
        title() {
            return `${this.firstName} ${this.lastName}`;
        },
    },
    destroyed() {
        this.__clearStorage();
    },
    methods: {
        ...mapActions('user', [
            '__clearStorage',
            'setLanguagePrivileges',
            'updateUser',
        ]),
        ...mapActions('authentication', [
            'getUser',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeErrors',
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

            const mappedDrafts = {};

            Object.keys(this.drafts).forEach((key) => {
                const [
                    languageCode,
                    privilege,
                ] = key.split('/');

                if (typeof mappedDrafts[languageCode] === 'undefined') {
                    mappedDrafts[languageCode] = {};
                }

                mappedDrafts[languageCode][privilege] = Boolean(this.drafts[key]);
            });

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
                    mappedDrafts,
                ),
            };

            try {
                await this.$setLoader('footerButton');
                isUpdated = await this.updateUser({
                    id: this.id,
                    data: user,
                });
            } catch (e) {
                this.onError(e.data);
            } finally {
                if (isUpdated !== false) {
                    this.removeErrors();
                    this.$addAlert({
                        type: ALERT_TYPE.SUCCESS,
                        message: 'User updated',
                    });
                    this.setLanguagePrivileges(user.languagePrivilegesCollection);

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
