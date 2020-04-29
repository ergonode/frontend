/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form title="General">
        <template #body>
            <FormSection>
                <TranslationSelect
                    :value="selectedLanguages"
                    :options="languages"
                    :solid="true"
                    label="Languages"
                    :regular="true"
                    :multiselect="true"
                    :clearable="true"
                    :searchable="true"
                    :drop-down-height="400"
                    @input="setSelectedLanguages"
                    @search="getFilteredData" />
                <TreeSelect
                    :value="treeValue"
                    :options="tree"
                    :solid="true"
                    label="Languages tree example"
                    :regular="true"
                    :multiselect="true"
                    @input="setLanguageTree" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'MainSettingsForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/FormSection'),
        TranslationSelect: () => import('@Core/components/Inputs/Select/TranslationSelect'),
        TreeSelect: () => import('@Core/components/Inputs/Select/Tree/TreeSelect'),
    },
    data() {
        return {
            // TODO: remove when languages tree will be ready
            treeValue: [
                {
                    id: 'pl_PL',
                    key: 'pl_PL',
                    name: 'Polska',
                },
            ],
            tree: [
                {
                    id: 'pl_PL',
                    key: 'pl_PL',
                    name: 'Polska',
                    childrens: [
                        {
                            id: 'en_EN',
                            key: 'en_EN',
                            name: 'Angielski',
                            childrens: [
                                {
                                    id: 'us_US',
                                    key: 'us_US',
                                    name: 'Angielski USA',
                                    childrens: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    },
    computed: {
        ...mapState('languageSettings', {
            languages: state => state.languages,
            selectedLanguages: state => state.selectedLanguages,
        }),
    },
    methods: {
        ...mapActions('languageSettings', [
            'setSelectedLanguages',
            'getFilteredData',
        ]),
        setLanguageTree() {
        },
    },
};
</script>
