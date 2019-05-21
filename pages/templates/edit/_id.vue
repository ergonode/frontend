/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplatePage
        :title="templateTitle"
        is-edit
        @dismiss="onCancel"
        @save="onCreate" />
</template>

<script>

import { mapState, mapActions } from 'vuex';
import prepareJSON from '~/model/template_designer/JSON/prepareJSON';
import { asyncRequestWrapper } from '~/model/wrappers/asyncRequestWrapper';

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'Edit',
    middleware: ['tab/redirectToTemplateDesignerGeneral'],
    components: {
        TemplatePage: () => import('~/components/Pages/TemplatePage'),
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('templateDesigner', {
            groups: state => state.templateGroups,
            templateTitle: state => state.title,
            templateImage: state => state.image,
            templateDesignerLayout: state => state.templateLayout,
        }),
    },
    destroyed() {
        this.clearStorage();
    },
    methods: {
        ...mapActions('templateDesigner', [
            'updateTemplateDesigner',
            'addElementToLayoutAtCoordinates',
            'getTemplateByID',
            'clearStorage',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onCancel() {
            this.$router.push('/templates');
        },
        onUpdateTemplateDesignerSuccess() {
            this.removeValidationErrors();
            this.$addAlert(this.$store, { type: 'success', message: 'Template updated' });
            this.$router.push('/templates');
        },
        onCreate() {
            const { id } = this.$route.params;
            this.updateTemplateDesigner({
                id,
                data: prepareJSON({
                    title: this.templateTitle,
                    // image: this.templateImage, // uncomment when the BE corrects update errors
                    layout: this.templateDesignerLayout,
                }),
                onSuccess: this.onUpdateTemplateDesignerSuccess,
                onError: this.onError,
            });
        },
    },
    async fetch({ store, error, params }) {
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;
        const { id } = params;

        const groupsRequest = store.dispatch('list/getGroups', {
            languageCode: userLanguageCode,
            onSuccess: () => {},
            onError: () => {},
        });

        const templateRequest = store.dispatch('templateDesigner/getTemplateByID', {
            path: `${userLanguageCode}/templates/${id}`,
            onError: () => {},
        });

        const getTypesRequest = asyncRequestWrapper({
            action: 'templateDesigner/getTypes',
            path: `${userLanguageCode}/templates/types`,
            params: {},
            store,
            error,
        });
        await store.dispatch('list/clearStorage');
        return Promise.all([groupsRequest, getTypesRequest, templateRequest]);
    },
};
</script>

<style lang="scss" scoped>
    .template-container {
        .template-container__content {
            display: grid;
            grid-template-columns: 300px auto;
        }
    }
</style>
