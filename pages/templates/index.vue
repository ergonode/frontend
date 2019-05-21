/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <NavigationHeader
            :title="title"
            :buttons="buttons"
            icon="sprite-menu menu-boxes--selected" />
        <div class="templates">
            <div
                v-for="section in templatesSection"
                v-show="sectionElementsByID(section.id).length !== 0"
                :key="section.id"
                class="section">
                <span
                    class="section__title"
                    v-text="section.name" />
                <div class="section__items">
                    <TemplateElement
                        v-for="element in sectionElementsByID(section.id)"
                        :key="element.id"
                        :index="element.id"
                        :image="element.image_id"
                        :title="element.name" />
                </div>
            </div>
        </div>
    </PageWrapper>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'Templates',
    components: {
        NavigationHeader: () => import('~/components/ReusableHeader/NavigationHeader'),
        TemplateElement: () => import('~/components/Template/TemplateElement'),
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
    },
    data() {
        return {
            title: 'Templates',
            buttons: [
                {
                    title: 'CREATE TEMPLATE',
                    color: 'success',
                    action: this.onCreate,
                    icon: 'sprite-button button-add-light',
                },
            ],
        };
    },
    computed: {
        ...mapState('templateLists', {
            templatesSection: state => state.templatesSection,
        }),
        ...mapGetters('templateLists', {
            sectionElementsByID: 'sectionElementsByID',
        }),
    },
    destroyed() {
        this.clearStorage();
    },
    methods: {
        ...mapActions('templateLists', [
            'clearStorage',
        ]),
        onCreate() {
            this.$router.push('templates/new');
        },
    },
    async fetch({ store, error }) {
        const params = {
            limit: 5000,
            offset: 0,
        };
        return store.dispatch('templateLists/getTemplatesSection', {
            params,
            onError: (err) => {
                if (err.response && err.response.status === 404) {
                    return error({ statusCode: 404, message: err.message });
                }
                return false;
            },
        });
    },
};
</script>

<style lang="scss" scoped>
    .templates {
        padding: 0 24px 24px;
        overflow: auto;

        .section {
            display: flex;
            flex-direction: column;

            &__title {
                @include setFont(medium, small, regular, $lightGraphite, 1);
                margin-bottom: 8px;
            }

            &__items {
                display: grid;
                grid-template-columns: repeat(auto-fill, 300px);
                grid-auto-rows: 205px;
                grid-gap: 24px;
            }
        }
    }
</style>
