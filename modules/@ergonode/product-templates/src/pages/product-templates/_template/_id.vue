/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplatePage
        :title="templateTitle"
        @remove="onRemove" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    toLowerCaseFirstLetter,
} from '@Core/models/stringWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'Edit',
    components: {
        TemplatePage: () => import('@Templates/components/Pages/TemplatePage'),
    },
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store, params,
    }) {
        await store.dispatch('productTemplate/getTemplate', params);
    },
    computed: {
        ...mapState('productTemplate', {
            templateTitle: state => state.title,
        }),
        scope() {
            return toLowerCaseFirstLetter(this.$options.name);
        },
    },
    beforeDestroy() {
        this.__clearListStorage();
        this.__clearStorage();
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('productTemplate', [
            'removeTemplate',
            '__clearStorage',
        ]),
        ...mapActions('list', {
            __clearListStorage: '__clearStorage',
        }),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Template removed',
            });
            this.$router.push({
                name: 'product-templates',
            });
        },
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this template?',
                confirmCallback: () => {
                    this.removeTemplate({
                        scope: this.scope,
                        onSuccess: this.onRemoveSuccess,
                    });
                },
            });
        },
    },
    head() {
        return {
            title: `${this.templateTitle} - Product templates - Ergonode`,
        };
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
