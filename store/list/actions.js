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
        const notAssignedElementsPath = `${languageCode}/attributes`;
        const notAssignedElementsParams = {
            limit: 9999,
            offset: 0,
            filter: { groups: null },
        };
        let parsedGroups = {};

        return Promise.all([
            this.app.$axios.$get(groupsPath).then(({ collection: groups }) => {
                const tmpGroups = groups.map(({ id, label, elements_count: elementsCount }) => ({
                    id, label, elementsCount,
                }));
                parsedGroups = { ...parsedGroups, ...tmpGroups };
            }).catch(e => console.log(e)),
            this.app.$axios.$get(notAssignedElementsPath,
                { params: notAssignedElementsParams }).then(({ filtered }) => {
                // TODO: We need to get the number of not assigned elements in group,
                //  the best option would be to call get elements and get count of them,
                //  subtraction all groups count with all elements count will be the correct number
                //  of elements not signed to any of the group. - Waiting for BE - it is workaround.

                const defaultGroup = { id: null, label: 'Unassigned attributes', elementsCount: filtered };

                parsedGroups = {
                    ...parsedGroups,
                    [Object.keys(parsedGroups).length]: defaultGroup,
                };
            }).then(() => {
                commit('setGroupsForLanguage', { languageCode, groups: parsedGroups });
            }).catch(e => console.log(e)),
        ]);
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
