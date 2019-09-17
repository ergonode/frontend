/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <NavigationHeader
            title="Templates"
            :buttons="buttons"
            :is-read-only="$isReadOnly('TEMPLATE_DESIGNER')"
            icon="Templates" />
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
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'Templates',
    components: {
        NavigationHeader: () => import('~/components/ReusableHeader/NavigationHeader'),
        TemplateElement: () => import('~/components/Template/TemplateElement'),
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
    },
    created() {
        this.buttons = [
            {
                title: 'CREATE TEMPLATE',
                color: 'success',
                action: this.onCreate,
                disabled: !this.$hasAccess('TEMPLATE_DESIGNER_CREATE'),
            },
        ];
    },
    beforeDestroy() {
        delete this.buttons;
    },
    computed: {
        ...mapState('templateLists', {
            templatesSection: state => state.templatesSection,
        }),
        ...mapGetters('templateLists', {
            sectionElementsByID: 'sectionElementsByID',
        }),
    },
    methods: {
        onCreate() {
            this.$router.push('templates/new');
        },
    },
    async fetch({ store }) {
        const params = {
            limit: 5000,
            offset: 0,
        };
        await store.dispatch('templateLists/clearStorage');
        await store.dispatch('templateLists/getTemplatesSection', {
            params,
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
