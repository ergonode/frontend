/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Widget
        title="Statuses"
        :is-placeholder-visible="!isPrefetchingData && statuses.length === 0">
        <template #appendHeader>
            <ActionButton
                :fixed-content="true"
                :size="tinySize"
                :title="workflowLanguage"
                :disabled="isPrefetchingData"
                :options="languageOptions"
                @input="onValueChange" />
        </template>
        <template #body>
            <Preloader v-if="isPrefetchingData" />
            <ul
                class="list-status"
                v-else>
                <template v-for="(status, index) in statuses">
                    <li
                        class="list-status-element"
                        :key="status.id">
                        <ProductStatusBadge :status="status" />
                        <span v-text="status.value" />
                    </li>
                    <div
                        class="list-status-element-divider"
                        :key="`${status.id}|${index}`" />
                </template>
            </ul>
        </template>
    </Widget>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    getStatusesCount,
} from '@Dashboard/services';
import ProductStatusBadge from '@Products/components/Badges/ProductStatusBadge';
import ActionButton from '@UI/components/ActionButton/ActionButton';
import Preloader from '@UI/components/Preloader/Preloader';
import Widget from '@UI/components/Widget/Widget';
import {
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'StatusesWidget',
    components: {
        Widget,
        ProductStatusBadge,
        ActionButton,
        Preloader,
    },
    async fetch() {
        await this.getStatusesCount();
    },
    data() {
        return {
            workflowLanguage: '',
            statuses: [],
            isPrefetchingData: true,
        };
    },
    computed: {
        ...mapState('core', [
            'defaultLanguageCode',
        ]),
        ...mapGetters('core', [
            'activeLanguages',
        ]),
        tinySize() {
            return SIZE.TINY;
        },
        languageOptions() {
            return this.activeLanguages.map(({
                name,
            }) => name);
        },
    },
    created() {
        this.workflowLanguage = this.getWorkflowLanguageName();
    },
    methods: {
        getWorkflowLanguageName() {
            return this.activeLanguages.find(({
                code,
            }) => code === this.defaultLanguageCode).name;
        },
        getWorkflowLanguageCode() {
            return this.activeLanguages.find(({
                name,
            }) => name === this.workflowLanguage).code;
        },
        async getStatusesCount() {
            try {
                this.isPrefetchingData = true;

                const workflowLanguageCode = this.getWorkflowLanguageCode();

                const statusesCount = await getStatusesCount({
                    $axios: this.$axios,
                    workflowLanguage: workflowLanguageCode,
                });

                this.statuses = statusesCount.map((status) => {
                    const {
                        status_id,
                        code,
                        value,
                        label,
                        color,
                    } = status;

                    return {
                        id: status_id,
                        color,
                        label: label || `#${code}`,
                        value: `${value} products`,
                    };
                });

                this.isPrefetchingData = false;
            } catch (e) {
                if (this.$axios.isCancel(e)) {
                    return;
                }

                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'Product statuses haven’t been fetched properly',
                });

                this.isPrefetchingData = false;
            }
        },
        async onValueChange(value) {
            this.workflowLanguage = value;

            await this.getStatusesCount();
        },
    },
};
</script>

<style lang="scss" scoped>
    .list-status {
        display: grid;
        grid-row-gap: 16px;
    }

    .list-status-element {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: $WHITE;
        font: $FONT_MEDIUM_14_20;
    }

    .list-status-element-divider {
        height: 1px;
        background-color: $GRAPHITE;
    }
</style>
