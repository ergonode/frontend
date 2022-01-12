UPGRADE FROM 1.2 to 1.3

### Workflow

- Vuex `workflow` state has changed

```javascript
// FROM

export default () => ({
    // ...
    transition: {
        source: '', // <---
        destination: '', // <---
        conditionSetId: '',
    },
    // ...
});
// TO

export default () => ({
    // ...
    transition: {
        from: '', // <---
        to: '', // <---
        conditionSetId: '',
    },
    // ...
});
```

- Extended methods
  - for key `@Workflow/store/workflow/action/updateTransition/__before` has changed `data` properties
    - `source` => `from`, `destination` => `to`
  - for key `@Workflow/store/workflow/action/removeTransition/__before` has changed `data` properties
    - `source` => `from`, `destination` => `to`
  - change extended key
    `@Workflow/store/workflow/action/updateTransitions/__before` => `@Workflow/store/workflow/action/updateWorkflow/__before`
  - change extended key
    `@Workflow/store/workflow/action/updateTransitions/__after` => `@Workflow/store/workflow/action/updateWorkflow/__after`

- `@Workflow/services/index.js`:
  - `getTransition` arguments have been renamed from `source` => `from`, `destination` => `to`
  - `updateTransition` arguments have been renamed from `source` => `from`, `destination` => `to`
  - `removeTransition` arguments have been renamed from `source` => `from`, `destination` => `to`
  - change method name from `getDefaultStatus` => `getWorkflow`
  - change method name from `updateTransitions` => `updateWorkflow`

- `@Workflow/models/workflowDesigner.js`
  - `getSourceAndDestination` => `getFromAndToTransition`

- `@Workflow/store/workflow/actions.js`
  - `updateTransitions` => `updateWorkflow`

### Status transitions

- Vuex `statusTransition` state has changed

```javascript
// FROM

export default () => ({
    // ...
    source: null, // <--
    destination: null, // <--
    // ...
});
// TO

export default () => ({
    // ...
    from: null,
    to: null,
    // ...
});
```

- Extended methods
  - for key `@Transitions/store/statusTransition/action/createStatusTransition/__before` has changed `data` properties
    - `source` => `from`, `destination` => `to`
  - for key `@Transitions/store/statusTransition/action/removeStatusTransition/__before` has changed `data` properties
    - `source` => `from`, `destination` => `to`

- `@Transitions/services/index.js`:
  - `get` arguments have been renamed from `source` => `from`, `destination` => `to`
  - `create` data properties have been renamed from `source` => `from`, `destination` => `to`
  - `update` arguments have been renamed from `source` => `from`, `destination` => `to`
  - `remove` arguments have been renamed from `source` => `from`, `destination` => `to`
