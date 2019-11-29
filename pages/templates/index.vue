/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Templates"
            :is-read-only="$isReadOnly('TEMPLATE_DESIGNER')"
            icon="Templates">
            <template #mainAction>
                <PrependIconButton
                    title="NEW TEMPLATE"
                    :size="smallSize"
                    :disabled="!$hasAccess(['TEMPLATE_DESIGNER_CREATE'])"
                    @click.native="onCreate">
                    <template #prepend="{ color }">
                        <IconAdd
                            :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
        <div class="templates">
            <div
                v-for="section in templatesSection"
                v-show="sectionElementsByID(section.id).length !== 0"
                :key="section.id"
                class="section">
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
    </Page>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { SIZES } from '~/defaults/buttons';

export default {
    name: 'Templates',
    components: {
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        TemplateElement: () => import('~/components/Template/TemplateElement'),
        Page: () => import('~/core/components/Layout/Page'),
        IconAdd: () => import('~/components/Icon/Actions/IconAdd'),
        PrependIconButton: () => import('~/core/components/Buttons/PrependIconButton'),
    },
    computed: {
        ...mapState('templateLists', {
            templatesSection: (state) => state.templatesSection,
        }),
        ...mapGetters('templateLists', {
            sectionElementsByID: 'sectionElementsByID',
        }),
        smallSize() {
            return SIZES.SMALL;
        },
    },
    methods: {
        onCreate() {
            this.$router.push('templates/template/new');
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
        padding: 24px 20px 24px 24px;
        overflow: auto;

        .section {
            display: flex;
            flex-direction: column;

            &__title {
                color: $GRAPHITE_LIGHT;
                margin-bottom: 8px;
            }

            &__items {
                display: grid;
                justify-content: space-between;
                grid-template-columns: repeat(auto-fill, 300px);
                grid-auto-rows: 205px;
                grid-gap: 24px;
            }
        }
    }
</style>
