/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

function dispatchEditEvent(event, isEditing) {
    const customEvent = new CustomEvent('edit', { bubbles: true, detail: { isEditing } });

    event.target.dispatchEvent(customEvent);
}

const onKeyDown = (actionCell, editingAllowed, column, row, event) => {
    const { keyCode } = event;

    let element;

    if (!event.target.classList.contains('grid-cell') && !actionCell && keyCode !== 13 && keyCode !== 9) {
        return false;
    }

    switch (keyCode) {
    case 13:
        // Key: ENTER
        if (editingAllowed) {
            element = document.querySelector(`.coordinates-${column}-${row}`);
            if (!event.target.classList.contains('grid-cell') || event.target.classList.contains('grid-cell--selected')) {
                element.focus();
                dispatchEditEvent(event, false);
            } else {
                dispatchEditEvent(event, true);
            }
        }
        break;
    case 37:
        // Key: LEFT
        element = document.querySelector(`.coordinates-${column - 1}-${row}`);
        break;
    case 38:
        // Key: UP
        element = document.querySelector(`.coordinates-${column}-${row - 1}`);
        break;
    case 39:
    case 9:
        // Key: RIGHT || TAB
        element = document.querySelector(`.coordinates-${column + 1}-${row}`);
        if (!element) {
            // We get out of bounds - go to the next line
            element = document.querySelector(`.coordinates-0-${row + 1}`);
        }
        break;
    case 40:
        // Key: DOWN
        element = document.querySelector(`.coordinates-${column}-${row + 1}`);
        break;
    default: break;
    }

    event.preventDefault();

    if (keyCode !== 13) {
        if (element) {
            element.focus();
        }
    }

    return true;
};

export default {
    bind(el, binding) {
        const element = el;
        const {
            actionCell, editingAllowed, column, row,
        } = binding.value;

        element.setAttribute('tabindex', 0);
        element.addEventListener('keydown', onKeyDown.bind(null, actionCell, editingAllowed, column, row), false);
    },
    unbind(el) {
        el.removeEventListener('keydown', onKeyDown, false);
    },
};
