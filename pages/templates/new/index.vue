/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplatePage
        :title="templateTitle"
        @dismiss="onCancel"
        @create="onCreate" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { asyncRequestWrapper } from '~/model/wrappers/asyncRequestWrapper';

export default {
    name: 'New',
    middleware: ['tab/redirectToTemplateDesignerGeneral'],
    components: {
        TemplatePage: () => import('~/components/Pages/TemplatePage'),
    },
    data: () => ({
        title: 'Template designer',
    }),
    computed: {
        ...mapState('templateDesigner', {
            templateTitle: state => state.title,
            templateImage: state => state.image,
            layoutElements: state => state.layoutElements,
        }),
    },
    methods: {
        ...mapActions('templateDesigner', [
            'createTemplateDesigner',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onCancel() {
            this.$router.back();
        },
        onCreateTemplateDesignerSuccess(id) {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Template created' });
            this.$router.push({
                name: 'templates-edit-id',
                params: {
                    id,
                },
            });
        },
        onCreate() {
            import('~/model/mappers/templateMapper').then(({ getMappedLayoutElementsForAPIUpdate }) => {
                this.createTemplateDesigner({
                    data: {
                        name: this.templateTitle,
                        image: this.templateImage,
                        elements: getMappedLayoutElementsForAPIUpdate(this.layoutElements),
                    },
                    onSuccess: this.onCreateTemplateDesignerSuccess,
                    onError: this.onError,
                });
            });
        },
    },
    async fetch({ store, error }) {
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;

        await store.dispatch('templateDesigner/clearStorage');

        const getTypesRequest = asyncRequestWrapper({
            action: 'templateDesigner/getTypes',
            path: `${userLanguageCode}/templates/types`,
            params: {},
            store,
            error,
        });

        const groupsRequest = store.dispatch('list/getGroups', {
            languageCode: userLanguageCode,
            onSuccess: () => {},
            onError: () => {},
        });

        return Promise.all([groupsRequest, getTypesRequest]);
    },
};
</script>
