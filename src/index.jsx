
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';

const iconsRaw = {solid, regular, brands};

let _config = {
    defaultStyle: "solid"
};

export const config = (name, value) => {
    _config[name] = value;
}

let Icon = {};
let Mask = {};
['solid', 'regular', 'brands'].forEach(style => {
    Object.keys(iconsRaw[style]).forEach(icon => {
        const data = iconsRaw[style][icon];
        const mask = [data.prefix, data.iconName];
        const iconName = icon.substr(2);

        const component = ({
            inverse, stack,
            ...props
        }) => {
            props.icon=data;

            let classes = [];
            const option = (flag, name) => {
                if(flag) classes.push(name);
            }
            option(inverse, 'fa-inverse');

            //Generate and return the icon
            return stack
                ? <Layer {...props.stack}>
                    <FontAwesomeIcon {...props} className={classes.join(' ')} transform="shrink-2 left-4 up-4" style={{opacity: 0.2}}/>
                    <FontAwesomeIcon {...props} className={classes.join(' ')} transform="shrink-2" style={{opacity: 0.5}} />
                    <FontAwesomeIcon {...props} className={classes.join(' ')} transform="shrink-2 right-4 down-4" />
                  </Layer>
                : <FontAwesomeIcon {...props} className={classes.join(' ')} />
        };

        if(typeof Icon[iconName] === 'undefined') {
            Icon[iconName] = component;
            Mask[iconName] = mask;
        }
        Icon[iconName][style] = component;
        Mask[iconName][style] = mask;
    });
});

let Layer = ({children, className, size, ...props}) =>
    <span className={size ? `fa-${size}` : ""}>
        <span className={(className || "") + " fa-layers fa-fw"} {...props}>
            {children}
        </span>
    </span>;

Layer.Text = ({children, className, transform, ...props}) =>
    <span className={(className || "") + " fa-layers-text"} {...props} data-fa-transform={transform || ""} >
        {children}
    </span>;

Layer.Counter = ({children, className, ...props}) =>
    <span className={(className || "") + " fa-layers-counter"} {...props}>
        {children}
    </span>;

export {Layer, Icon, Mask};
