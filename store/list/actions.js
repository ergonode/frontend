/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getMappedFilter } from '~/model/mappers/gridDataMapper';

export default {
    getGroups({ commit }, {
        languageCode,
    }) {
        const groupsPath = `${languageCode}/attributes/groups`;

        return this.app.$axios.$get(groupsPath).then(({ collection: groups }) => {
            commit('setGroupsForLanguage', {
                languageCode,
                groups: groups.map(({ id, label, elements_count: elementsCount }) => ({
                    id, label, elementsCount,
                })),
            });
        }).catch(e => console.log(e));
    },
    getElementsForGroup({ commit, state }, {
        listType, groupId, elementsCount, languageCode,
    }) {
        const { elements: stateElements } = state;
        const path = `${languageCode}/${listType}`;
        const params = {
            limit: elementsCount,
            offset: 0,
            filter: groupId ? getMappedFilter({ groups: groupId }) : null,
        };

        return this.app.$axios.$get(path, { params }).then(({ collection: elements }) => {
            if (!stateElements[languageCode]) {
                commit('initializeElementsForLanguage', { languageCode });
                commit('setElementsForLanguage', { languageCode, elements });
            } else {
                const elementsToAdd = elements.filter(
                    element => !stateElements[languageCode].some(
                        stateElement => stateElement.id === element.id,
                    ),
                );

                commit('setElementsForLanguage', { languageCode, elements: elementsToAdd });
            }
        }).catch(e => console.log(e));
    },
    setConfigurationForList: ({ commit }, configurations) => {
        Object.entries(configurations).forEach((configuration) => {
            commit('setConfigurationForList', configuration);
        });
    },
    clearStorage: ({ commit }) => commit('clearStorage'),
};
