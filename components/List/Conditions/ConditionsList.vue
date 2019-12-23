/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <List>
        <ListScrollableContainer>
            <ConditionsListElement
                v-for="element in elementsByLanguageCode"
                :key="element.id"
                :item="element"
                :language-code="languageCode" />
        </ListScrollableContainer>
    </List>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'ConditionsList',
    components: {
        List: () => import('~/core/components/List/List'),
        ListScrollableContainer: () => import('~/core/components/List/ListScrollableContainer'),
        ConditionsListElement: () => import('~/components/List/Conditions/ConditionsListElement'),
    },
    props: {
        languageCode: {
            type: String,
            required: true,
        },
    },
    destroyed() {
        this.clearStorage();
    },
    computed: {
        ...mapState('list', {
            elements: (state) => state.elements,
        }),
        elementsByLanguageCode() {
            const { [this.languageCode]: language } = this.elements;
            if (!language || language.length === 0) return [];

            return language;
        },
    },
    methods: {
        ...mapActions('list', [
            'clearStorage',
        ]),
    },
};
</script>
