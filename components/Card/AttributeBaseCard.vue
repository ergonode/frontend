/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseCard>
        <TextField
            :value="code"
            solid
            required
            :error-messages="errorCodeMessage"
            :disabled="isDisabled"
            regular
            label="Code"
            hint="Attribute code must be unique"
            @input="setAttributeCode" />
        <Select
            :value="groups"
            solid
            :options="attrGroupValues"
            label="Group"
            regular
            multiselect
            clearable
            :disabled="!isUserAllowedToUpdate"
            :error-messages="errorGroupsMessage"
            @input="setAttributeGroups" />
        <Divider />
        <div class="horizontal-wrapper">
            <Toggler
                :value="isMultilingual"
                :disabled="isDisabled"
                @input="setMultilingualAttribute" />
            <Label
                text="Multilingual attribute"
                class="txt--dark-graphite typo-btn--xs"
                :is-disabled="isDisabled" />
            <InfoHint :hint="multilingualHint" />
        </div>
        <Select
            :value="type"
            solid
            required
            label="Type"
            regular
            :disabled="isDisabled"
            :options="attrTypeValues"
            :error-messages="errorTypeMessage"
            @input="onTypeChange" />
        <Select
            v-if="hasParams"
            :value="parameter"
            solid
            required
            regular
            :multiselect="hasParamsWithMultiChoice"
            :label="paramsLabel"
            :options="attrParamValues"
            :error-messages="errorParamsMessage"
            :disabled="!isUserAllowedToUpdate"
            @input="(parameter) => setAttributeParameter(parameter)" />
        <AttributeOptionKeyValues
            v-show="hasOptions"
            :disabled="!isUserAllowedToUpdate" />
        <slot />
    </BaseCard>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { toCapitalize } from '~/model/stringWrapper';
import { hasParams, hasOptions, getParamsOptionsForType } from '~/model/attributes/AttributeTypes';
import { getMappedParameterKey } from '~/model/mappers/attributeMapper';
import { getKeyByValue } from '~/model/objectWrapper';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import BaseCard from '~/components/Card/BaseCard';

export default {
    name: 'AttributeBaseCard',
    components: {
        BaseCard,
        AttributeOptionKeyValues: () => import('~/components/Card/AttributeOptionKeyValues'),
        Toggler: () => import('~/components/Inputs/Toggler'),
        TextField: () => import('~/components/Inputs/TextField'),
        Select: () => import('~/components/Inputs/Select/Select'),
        Label: () => import('~/components/Label/Label'),
        InfoHint: () => import('~/components/Inputs/Hint/InfoHint'),
        Divider: () => import('~/components/Dividers/Divider'),
    },
    mixins: [errorValidationMixin],
    data() {
        return {
            multilingualHint: 'Multilingual attribute is an attribute which has translations, by deselecting it attribute is going to display same values for each language.',
        };
    },
    computed: {
        ...mapState('attribute', {
            attrID: state => state.id,
            code: state => state.code,
            groups: state => state.groups,
            type: state => state.type,
            parameter: state => state.parameter,
            isMultilingual: state => state.isMultilingual,
        }),
        ...mapState('data', {
            attrGroups: state => state.attrGroups,
            attrTypes: state => state.attrTypes,
        }),
        paramsLabel() {
            const paramsKey = getMappedParameterKey(
                this.attrTypes,
                this.type,
            );

            return toCapitalize(paramsKey);
        },
        isDisabled() {
            return Boolean(this.attrID);
        },
        isUserAllowedToUpdate() {
            return this.$canIUse('ATTRIBUTE_UPDATE');
        },
        currentTypeKey() {
            return getKeyByValue(this.attrTypes, this.type);
        },
        hasParamsWithMultiChoice() {
            return this.currentTypeKey === 'IMAGE';
        },
        hasParams() {
            return hasParams(this.currentTypeKey);
        },
        params() {
            return getParamsOptionsForType(
                this.currentTypeKey,
                this.$store.state.data,
            );
        },
        hasOptions() {
            return hasOptions(this.currentTypeKey);
        },
        attrTypeValues() {
            return Object.values(this.attrTypes);
        },
        attrGroupValues() {
            return this.attrGroups.filter(group => group.id !== null).map(group => group.label);
        },
        attrParamValues() {
            return Array.isArray(this.params)
                ? this.params.map(param => param.label)
                : Object.values(this.params);
        },
        errorCodeMessage() {
            const codeIndex = 'code';
            return this.elementIsValidate(codeIndex);
        },
        errorTypeMessage() {
            const typeIndex = 'type';
            return this.elementIsValidate(typeIndex);
        },
        errorGroupsMessage() {
            const groupsIndex = 'groups';
            return this.elementIsValidate(groupsIndex);
        },
        errorParamsMessage() {
            const parametersIndex = `parameters_${this.paramsLabel.toLowerCase()}`;
            return this.elementIsValidate(parametersIndex);
        },
    },
    methods: {
        ...mapActions('attribute', [
            'setAttributeCode',
            'setAttributeGroups',
            'setAttributeType',
            'setAttributeParameter',
            'setMultilingualAttribute',
            'removeAttributeOptions',
            'clearStorage',
        ]),
        onTypeChange(type) {
            this.setAttributeType(type);

            // Clear chosen params
            if (this.hasParams) {
                this.setAttributeParameter('');
            }

            if (!this.hasOptions) {
                this.removeAttributeOptions();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .horizontal-wrapper {
        display: flex;
        align-items: center;

        & > label {
            margin-left: 8px;
        }
    }
</style>
