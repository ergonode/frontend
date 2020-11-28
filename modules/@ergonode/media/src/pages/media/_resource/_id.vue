/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResourcePage :title="`${name}.${extension}`" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import ResourcePage from '@Media/components/Pages/ResourcePage';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ResourceEdit',
    components: {
        ResourcePage,
    },
    mixins: [
        beforeLeavePageMixin,
    ],
    asyncData({
        app,
        store,
        params,
    }) {
        return store.dispatch('media/getResource', {
            id: params.id,
            onError: () => {
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'Media hasn`t been fetched properly',
                });
            },
        });
    },
    computed: {
        ...mapState('media', [
            'name',
            'extension',
        ]),
    },
    beforeDestroy() {
        this.__clearStorage();
        this.__clearTranslationsStorage();
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('media', [
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
            title: `${this.name} - Media - Ergonode`,
        };
    },
};
</script>
