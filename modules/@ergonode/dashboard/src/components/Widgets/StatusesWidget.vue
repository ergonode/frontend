/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Widget
        :title="$t('@Dashboard.dashboard.components.StatusesWidget.title')"
        :is-placeholder-visible="!isPrefetchingData && statuses.length === 0">
        <template #appendHeader>
            <ActionButton
                :fixed-content="true"
                :size="tinySize"
                :title="workflowLanguage.name"
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
                    <li
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
import {
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'StatusesWidget',
    components: {
        ProductStatusBadge,
    },
    async fetch() {
        await this.getStatusesCount();
    },
    data() {
        return {
            workflowLanguage: '',
            statuses: [],
            isPrefetchingData: false,
        };
    },
    computed: {
        ...mapState('authentication', {
            languagePrivileges: state => state.user.languagePrivileges,
        }),
        ...mapGetters('core', [
            'availableLanguages',
        ]),
        ...mapGetters('core', [
            'defaultLanguageCode',
        ]),
        tinySize() {
            return SIZE.TINY;
        },
        languageOptions() {
            return this.availableLanguages.map(({
                name,
            }) => name);
        },
    },
    created() {
        this.workflowLanguage = this.availableLanguages.find(({
            code,
        }) => code === this.defaultLanguageCode);
    },
    methods: {
        async getStatusesCount() {
            try {
                this.isPrefetchingData = true;

                const statusesCount = await getStatusesCount({
                    $axios: this.$axios,
                    workflowLanguage: this.workflowLanguage.code,
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
                        value: value === 1
                            ? this.$t('@Dashboard.dashboard.components.StatusesWidget.productsCountSingularLabel', {
                                info: value,
                            })
                            : this.$t('@Dashboard.dashboard.components.StatusesWidget.productsCountPluralLabel', {
                                info: value,
                            }),
                    };
                });

                this.isPrefetchingData = false;
            } catch (e) {
                if (this.$axios.isCancel(e)) {
                    return;
                }

                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: this.$t('@Dashboard.dashboard.components.StatusesWidget.getRequest'),
                });

                this.isPrefetchingData = false;
            }
        },
        async onValueChange(value) {
            this.workflowLanguage = this.availableLanguages.find(({
                name,
            }) => name === value);

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
