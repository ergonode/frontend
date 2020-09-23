/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributePage
        :title="code"
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
    name: 'EditAttribute',
    components: {
        AttributePage: () => import('@Attributes/components/Pages/AttributePage'),
    },
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store, params,
    }) {
        await Promise.all([
            store.dispatch('attribute/getAttribute', params),
            store.dispatch('attribute/getAttributeOptions', params),
        ]);
    },
    computed: {
        ...mapState('attribute', [
            'code',
        ]),
        scope() {
            return toLowerCaseFirstLetter(this.$options.name);
        },
    },
    beforeDestroy() {
        this.__clearStorage();
        this.__clearTranslationsStorage();
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('attribute', [
            'removeAttribute',
            '__clearStorage',
        ]),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
        ...mapActions('tab', {
            __clearTranslationsStorage: '__clearStorage',
        }),
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Attribute removed',
            });
            this.$router.push({
                name: 'attributes-grid',
            });
        },
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this attribute?',
                confirmCallback: () => {
                    this.removeAttribute({
                        scope: this.scope,
                        onSuccess: this.onRemoveSuccess,
                    });
                },
            });
        },
    },
    head() {
        return {
            title: `${this.code} - Attributes - Ergonode`,
        };
    },
};
</script>
