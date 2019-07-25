/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import { getMappedFilter } from '~/model/mappers/gridDataMapper';

export default {
    getGroups({ commit }, {
        languageCode,
    }) {
        const groupsPath = `${languageCode}/attributes/groups`;

        return this.app.$axios.$get(groupsPath).then(({ collection: groups }) => {
            commit(types.SET_GROUPS_FOR_LANGUAGE, {
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
            filter: groupId ? getMappedFilter({ groups: groupId }) : 'groups=',
        };

        return this.app.$axios.$get(path, { params }).then(({ collection: elements }) => {
            if (!stateElements[languageCode]) {
                commit(types.INITIALIZE_ELEMENTS_FOR_LANGUAGE, { languageCode });
                commit(types.SET_ELEMENTS_FOR_LANGUAGE, { languageCode, elements });
            } else {
                const elementsToAdd = elements.filter(
                    element => !stateElements[languageCode].some(
                        stateElement => stateElement.id === element.id,
                    ),
                );

                commit(types.SET_ELEMENTS_FOR_LANGUAGE, { languageCode, elements: elementsToAdd });
            }
        }).catch(e => console.log(e));
    },
    setConfigurationForList: ({ commit }, configurations) => {
        Object.entries(configurations).forEach((configuration) => {
            commit(types.SET_CONFIGURATION_FOR_LIST, configuration);
        });
    },
    clearStorage: ({ commit }) => commit(types.CLEAR_STATE),
};
