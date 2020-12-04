/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributeGroupPage :title="code" />
</template>

<script>
import AttributeGroupPage from '@Attributes/components/Pages/AttributeGroupPage';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'EditAttributeGroup',
    components: {
        AttributeGroupPage,
    },
    mixins: [
        beforeLeavePageMixin,
    ],
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        app,
        store,
        params,
    }) {
        await store.dispatch('attributeGroup/getAttributeGroup', {
            id: params.id,
            onError: () => {
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: app.i18n.t('attributeGroup.errors.getRequest'),
                });
            },
        });
    },
    computed: {
        ...mapState('attributeGroup', [
            'code',
        ]),
    },
    beforeDestroy() {
        this.__clearStorage();
        this.__clearTranslationsStorage();
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('attributeGroup', [
            '__clearStorage',
        ]),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
        ...mapActions('tab', {
            __clearTranslationsStorage: '__clearStorage',
        }),
    },
    head() {
        return {
            title: `${this.code} - ${this.$t('attributeGroup.page.head')}`,
        };
    },
};
</script>
