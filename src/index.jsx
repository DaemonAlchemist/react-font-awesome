
import React from 'react';
import fa from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';

let config = {
    defaultStyle: "solid"
}
export const faConfig = (name, value) => {
    config[name] = value;
};

const icons = {solid, regular, brands};
console.log(icons);
export default new Proxy({}, {
    get: (t, icon, r) => {
        return ({solid, regular, brands, spin, fw, ...params}) => {
            //Check and set style
            if (solid && regular || solid && brands || regular && brands) {
                throw "Font Awesome icons can only have one style"
            }
            const style = solid ? "solid" : regular ? "regular" : brands ? "brands" : config.defaultStyle;

            //Get the icon name and make sure it exists
            const iconName = "fa" + icon;
            if(typeof icons[style][iconName] === 'undefined') {
                throw "Could not find Font Awesome icon " + style + "." + iconName
            }

            //Setup additional params
            params.classes = [];
            if(spin) {params.classes.push('fa-spin');}
            if(fw) {params.classes.push('fa-fw');}

            //Generate and return the icon
            const __html = fa.icon(icons[style]["fa" + icon], params).html[0];
            return <span dangerouslySetInnerHTML={{__html}} />;
        }
    }
});
