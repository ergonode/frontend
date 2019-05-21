/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="template-designer">
        <div class="horizontal-wrapper">
            <VerticalTabBar :items="verticalTabs" />
            <div class="grid-wrapper">
                <div class="template-designer__grid">
                    <template
                        v-for="(layoutElement, index) in layout">
                        <Component
                            :is="getComponentViaName(layoutElement.component)"
                            :key="index"
                            v-bind="{ layoutElement }" />
                    </template>
                </div>
            </div>
        </div>
        <Footer :buttons="buttons" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TemplateGridItem from './TemplateGridItem';
import TemplateGridSection from './TemplateGridSection';
import AttributeElement from '~/components/Template/AttributeElement';

export default {
    name: 'TemplateGrid',
    components: {
        VerticalTabBar: () => import('~/components/Tab/VerticalTabBar'),
        Footer: () => import('~/components/ReusableFooter/Footer'),
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            buttons: [
                // TODO: Uncomment when we will have this feature
                // {
                //     title: 'PREVIEW',
                //     color: 'transparent',
                //     action: vm.onPreview,
                //     theme: 'dark',
                // },
                {
                    title: 'SAVE TEMPLATE',
                    action: this.updateButton.action,
                },
            ],
            verticalTabs: [
                {
                    title: 'Filters & Columns',
                    component: () => import('~/components/Card/AttributesListTab'),
                    icon: 'sprite-sidebar sidebar-filter',
                    active: true,
                },
            ],
        };
    },
    computed: {
        ...mapState('templateDesigner', {
            templateGroups: state => state.templateGroups,
            layout: state => state.templateLayout,
            titleValidationError: state => state.titleValidationError,
            title: state => state.title,
        }),
        vmTitle: {
            get() {
                return this.title;
            },
            set(value) {
                this.setTemplateDesignerTitle({ title: value });
            },
        },
        errorMessages() {
            return this.titleValidationError ? [this.titleValidationError] : null;
        },
    },
    methods: {
        ...mapActions('templateDesigner', [
            'setTemplateDesignerTitle',
        ]),
        getComponentViaName(name) {
            switch (name) {
            case 'TemplateGridItem':
                return TemplateGridItem;
            case 'TemplateGridSection':
                return TemplateGridSection;
            case 'AttributeElement':
                return AttributeElement;
            default:
                return null;
            }
        },
        onPreview() {

        },
    },
};
</script>

<style lang="scss" scoped>
    .template-designer {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        flex-grow: 1;

        .horizontal-wrapper {
            display: flex;
            flex: 1;
            margin: 24px 24px 0;

            .grid-wrapper {
                flex: 1;
                width: 0;
                overflow: auto;
            }
        }

        &__grid {
            position: relative;
            display: grid;
            height: 0;
            padding: 0 21px;
            grid-gap: 10px 21px;
            grid-template-columns: repeat(4, minmax(240px, auto));
        }
    }
</style>
