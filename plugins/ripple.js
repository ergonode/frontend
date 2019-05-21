/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
function setProps(modifiers, props) {
    modifiers.forEach((item) => {
        if (isNaN(Number(item))) props.event = item;
        else props.transition = item;
    });
}

const doRipple = ({ transition, backgroundColor }, event) => {
    const { target } = event;
    // Get border to avoid offsetting on ripple container position
    const targetBorder = parseInt((getComputedStyle(target).borderWidth).replace('px', ''), 10);
    // Get necessary variables
    const rect = target.getBoundingClientRect();
    const { left, top } = rect;
    const width = target.offsetWidth;
    const height = target.offsetHeight;
    const dx = event.clientX - left;
    const dy = event.clientY - top;
    const maxX = Math.max(dx, width - dx);
    const maxY = Math.max(dy, height - dy);
    const style = window.getComputedStyle(target);
    const radius = Math.sqrt((maxX * maxX) + (maxY * maxY));
    const border = (targetBorder > 0) ? targetBorder : 0;
    // Create the ripple and its container
    const ripple = document.createElement('div');
    const rippleContainer = document.createElement('div');
    rippleContainer.className = 'ripple-container';
    ripple.className = 'ripple';

    // Styles for ripple
    ripple.style.marginTop = '0px';
    ripple.style.marginLeft = '0px';
    ripple.style.width = '1px';
    ripple.style.height = '1px';
    ripple.style.transition = `all ${transition}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.position = 'relative';
    ripple.style.zIndex = '1';
    ripple.style.backgroundColor = backgroundColor;

    // Styles for rippleContainer
    rippleContainer.style.position = 'absolute';
    rippleContainer.style.left = `${0 - border}px`;
    rippleContainer.style.top = `${0 - border}px`;
    rippleContainer.style.height = '0';
    rippleContainer.style.width = '0';
    rippleContainer.style.pointerEvents = 'none';
    rippleContainer.style.overflow = 'hidden';

    // Store target position to change it after
    const storedTargetPosition = ((target.style.position).length > 0)
        ? target.style.position
        : getComputedStyle(target).position;
    // Change target position to relative to guarantee ripples correct positioning
    if (storedTargetPosition !== 'relative') {
        target.style.position = 'relative';
    }

    rippleContainer.appendChild(ripple);
    target.appendChild(rippleContainer);

    ripple.style.marginLeft = `${dx}px`;
    ripple.style.marginTop = `${dy}px`;

    // No need to set positioning because ripple should be child of target and to it's relative position.
    // rippleContainer.style.left    = left + (((window.pageXOffset || document.scrollLeft) - (document.clientLeft || 0)) || 0) + "px";
    // rippleContainer.style.top     = top + (((window.pageYOffset || document.scrollTop) - (document.clientTop || 0)) || 0) + "px";
    rippleContainer.style.width = `${width}px`;
    rippleContainer.style.height = `${height}px`;
    rippleContainer.style.borderTopLeftRadius = style.borderTopLeftRadius;
    rippleContainer.style.borderTopRightRadius = style.borderTopRightRadius;
    rippleContainer.style.borderBottomLeftRadius = style.borderBottomLeftRadius;
    rippleContainer.style.borderBottomRightRadius = style.borderBottomRightRadius;

    rippleContainer.style.direction = 'ltr';

    setTimeout(() => {
        ripple.style.width = `${radius * 2}px`;
        ripple.style.height = `${radius * 2}px`;
        ripple.style.marginLeft = `${dx - radius}px`;
        ripple.style.marginTop = `${dy - radius}px`;
    }, 0);

    function clearRipple() {
        setTimeout(() => {
            ripple.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        }, 250);

        // Timeout set to get a smooth removal of the ripple
        setTimeout(() => {
            rippleContainer.parentNode.removeChild(rippleContainer);
        }, transition + 250);

        target.removeEventListener('mouseup', clearRipple, false);

        // After removing event set position to target to it's original one
        // Timeout it's needed to avoid jerky effect of ripple jumping out parent target
        setTimeout(() => {
            let clearPosition = true;
            for (let i = 0; i < target.childNodes.length; i += 1) {
                if (target.childNodes[i].className === 'ripple-container') {
                    clearPosition = false;
                }
            }

            if (clearPosition) {
                if (storedTargetPosition !== 'static') {
                    target.style.position = storedTargetPosition;
                } else {
                    target.style.position = '';
                }
            }
        }, transition + 250);
    }

    if (event.type === 'mousedown') {
        target.addEventListener('mouseup', clearRipple, false);
    } else {
        clearRipple();
    }
};

const Ripple = {
    bind(el, binding) {
        const props = {
            event: 'mousedown',
            transition: 600,
        };
        setProps(Object.keys(binding.modifiers), props);

        props.backgroundColor = binding.value || Ripple.color || 'rgba(0, 0, 0, 0.35)';

        el.addEventListener(props.event, doRipple.bind(null, props), false);
    },
};

export default Ripple;
