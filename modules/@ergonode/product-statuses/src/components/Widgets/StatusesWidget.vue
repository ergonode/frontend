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
import ActionButton from '@Core/components/ActionButton/ActionButton';
import Preloader from '@Core/components/Preloader/Preloader';
import Widget from '@Core/components/Widget/Widget';
import {
    COLORS,
} from '@Core/defaults/colors';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    getStatusesCount,
} from '@Dashboard/services';
import ProductStatusBadge from '@Products/components/Badges/ProductStatusBadge';
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
            colors: {},
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
            this.isPrefetchingData = true;

            const workflowLanguageCode = this.getWorkflowLanguageCode();

            const statusesCount = await getStatusesCount({
                $axios: this.$axios,
                workflowLanguage: workflowLanguageCode,
            });

            this.statuses = statusesCount.map((status) => {
                const {
                    status_id,
                    value,
                    label,
                } = status;

                if (typeof this.colors[status_id] === 'undefined') {
                    this.colors[status_id] = COLORS[Math.floor(Math.random() * COLORS.length)];
                }

                return {
                    id: status_id,
                    color: this.colors[status_id],
                    label,
                    value: `${value} products`,
                };
            });

            this.isPrefetchingData = false;
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
