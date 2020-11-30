/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('attribute.form.title')"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :errors="errors"
        :errors-presentation-mapper="errorMapper"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <Select
                    :data-cy="dataCyGenerator(typeFieldKey)"
                    :value="type"
                    required
                    :label="$t('attribute.form.typeLabel')"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :options="attributeTypeOptions"
                    :error-messages="errors[typeFieldKey]"
                    @input="onTypeChange" />
            </FormSection>
            <FormSection v-if="type">
                <TextField
                    :data-cy="dataCyGenerator(codeFieldKey)"
                    :value="code"
                    required
                    :error-messages="errors[codeFieldKey]"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :label="$t('attribute.form.nameLabel')"
                    :hint="$t('attribute.form.nameHint')"
                    @input="setCodeValue" />
                <Autocomplete
                    :data-cy="dataCyGenerator(groupsFieldKey)"
                    :value="groups"
                    :label="$t('attribute.form.groupLabel')"
                    :multiselect="true"
                    :searchable="true"
                    :clearable="true"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors[groupsFieldKey]"
                    href="attributes/groups/autocomplete"
                    @input="setGroupsValue">
                    <template #placeholder="{ isVisible }">
                        <DropdownPlaceholder
                            v-if="isVisible"
                            :title="placeholder.title"
                            :subtitle="placeholder.subtitle">
                            <template #action>
                                <Button
                                    title="GO TO ATTRIBUTE GROUPS"
                                    :size="smallSize"
                                    :disabled="!isAllowedToUpdate"
                                    @click.native="onNavigateToAttributeGroups" />
                            </template>
                        </DropdownPlaceholder>
                    </template>
                </Autocomplete>
                <Divider />
            </FormSection>
            <FormSection
                v-if="type"
                :title="$t('attribute.form.sectionTitle')">
                <Select
                    :data-cy="dataCyGenerator(scopeFieldKey)"
                    :value="attributeScope"
                    required
                    :label="$t('attribute.form.scopeLabel')"
                    :disabled="!isAllowedToUpdate"
                    :options="attributeScopeOptions"
                    :error-messages="errors[scopeFieldKey]"
                    @input="setScopeValue">
                    <template #append>
                        <InfoHint :hint="scopeHint" />
                    </template>
                </Select>
                <template v-for="(formComponent, index) in extendedForm">
                    <Component
                        :is="formComponent.component"
                        :key="index"
                        v-bind="bindingProps(formComponent)" />
                </template>
            </FormSection>
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import {
    ROUTE_NAME,
} from '@Attributes/config/routes';
import {
    SCOPE,
} from '@Attributes/defaults/attributes';
import {
    SIZE,
} from '@Core/defaults/theme';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import {
    getKeyByValue,
    isObject,
} from '@Core/models/objectWrapper';
import Autocomplete from '@UI/components/Autocomplete/Autocomplete';
import Divider from '@UI/components/Dividers/Divider';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import InfoHint from '@UI/components/Hints/InfoHint';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import Select from '@UI/components/Select/Select';
import TextField from '@UI/components/TextField/TextField';
import {
    mapActions,
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'AttributeForm',
    components: {
        DropdownPlaceholder,
        Form,
        FormSection,
        InfoHint,
        TextField,
        Select,
        Autocomplete,
        Divider,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('attribute', [
            'id',
            'code',
            'groups',
            'type',
        ]),
        ...mapState('attribute', {
            attributeScope: state => state.scope,
        }),
        ...mapState('dictionaries', [
            'attrTypes',
        ]),
        ...mapGetters('core', [
            'rootLanguage',
        ]),
        smallSize() {
            return SIZE.SMALL;
        },
        placeholder() {
            return {
                title: 'No attribute groups',
                subtitle: 'There are no attribute groups in the system, so you can create the first one.',
            };
        },
        extendedForm() {
            return this.$extendedForm({
                key: '@Attributes/components/Forms/AttributeForm',
                type: this.typeKey,
            });
        },
        scopeHint() {
            return this.$t('attribute.form.scopeHint', {
                lang: this.rootLanguage.name,
            });
        },
        typeKey() {
            return getKeyByValue(this.attrTypes, this.type);
        },
        isDisabled() {
            return Boolean(this.id);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.update,
            ]);
        },
        attributeTypeOptions() {
            return Object.values(this.attrTypes).sort();
        },
        attributeScopeOptions() {
            return Object.values(SCOPE);
        },
        codeFieldKey() {
            return 'code';
        },
        typeFieldKey() {
            return 'type';
        },
        groupsFieldKey() {
            return 'groups';
        },
        scopeFieldKey() {
            return 'scope';
        },
    },
    methods: {
        ...mapActions('attribute', [
            '__setState',
        ]),
        onNavigateToAttributeGroups() {
            this.$router.push({
                name: ROUTE_NAME.ATTRIBUTE_GROUPS_GRID,
            });
        },
        bindingProps({
            props = {},
        }) {
            return {
                disabled: !this.isAllowedToUpdate,
                typeKey: this.typeKey,
                scope: this.scope,
                changeValues: this.changeValues,
                errors: this.errors,
                ...props,
            };
        },
        errorMapper(errors) {
            return Object.keys(errors).reduce((acc, key) => {
                const tmpObject = acc;

                if (isObject(errors[key])) {
                    tmpObject[key] = Object.values(errors[key]).join(', ');
                } else {
                    tmpObject[key] = errors[key];
                }

                return tmpObject;
            }, {});
        },
        setCodeValue(value) {
            this.__setState({
                key: this.codeFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.codeFieldKey,
                value,
            });
        },
        setScopeValue(value) {
            this.__setState({
                key: this.scopeFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.scopeFieldKey,
                value,
            });
        },
        setGroupsValue(value) {
            this.__setState({
                key: this.groupsFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.groupsFieldKey,
                value,
            });
        },
        setTypeValue(value) {
            this.__setState({
                key: this.typeFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.typeFieldKey,
                value,
            });
        },
        dataCyGenerator(key) {
            return `attribute-${key}`;
        },
        onTypeChange(type) {
            this.setTypeValue(type);
        },
    },
};
</script>
