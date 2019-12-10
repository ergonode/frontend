/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplatePage
        :title="templateTitle"
        is-edit
        @dismiss="onDismiss"
        @remove="onRemove"
        @save="onCreate" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getParentRoutePath } from '~/model/navigation/tabs';

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'Edit',
    components: {
        TemplatePage: () => import('~/components/Pages/TemplatePage'),
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('templateDesigner', {
            groups: (state) => state.templateGroups,
            templateTitle: (state) => state.title,
            templateImage: (state) => state.image,
            layoutElements: (state) => state.layoutElements,
        }),
    },
    destroyed() {
        this.clearStorage();
    },
    methods: {
        ...mapActions('templateDesigner', [
            'updateTemplateDesigner',
            'removeTemplate',
            'getTemplateByID',
            'clearStorage',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push(getParentRoutePath(this.$route));
        },
        onUpdateTemplateDesignerSuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Template updated' });
            this.$router.push({ name: 'product-templates' });
        },
        onRemoveSuccess() {
            this.$addAlert({ type: 'success', message: 'Template removed' });
            this.$router.push({ name: 'product-templates' });
        },
        onRemove() {
            const isConfirm = confirm('Are you sure you want to delete this template?'); /* eslint-disable-line no-restricted-globals */
            if (isConfirm) {
                const { id } = this.$route.params;
                this.removeTemplate({
                    id,
                    onSuccess: this.onRemoveSuccess,
                });
            }
        },
        onCreate() {
            import('~/model/mappers/templateMapper').then(({ getMappedLayoutElementsForAPIUpdate }) => {
                const { id } = this.$route.params;
                this.updateTemplateDesigner({
                    id,
                    data: {
                        name: this.templateTitle,
                        image: this.templateImage,
                        elements: getMappedLayoutElementsForAPIUpdate(this.layoutElements),
                    },
                    onSuccess: this.onUpdateTemplateDesignerSuccess,
                    onError: this.onError,
                });
            });
        },
    },
    async fetch({ store, params }) {
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;
        const { id } = params;

        await Promise.all([
            store.dispatch('list/clearStorage'),
            store.dispatch('templateDesigner/getTypes', {
                path: `${userLanguageCode}/templates/types`,
            }),
            store.dispatch('list/getGroups', userLanguageCode),
            store.dispatch('list/getElementsForGroup', {
                listType: 'attributes',
                groupId: null,
                languageCode: userLanguageCode,
            }),
        ]);
        await store.dispatch('templateDesigner/getTemplateByID', {
            path: `${userLanguageCode}/templates/${id}`,
        });
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
