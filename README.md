#React Components for Font Awesome 5

##Overview

This package provides some simple sugar around the @fortawesome/react-fontawesome package.

##Basic Icons

```
import {Icon, Mask, config} from "react-font-awesome-5";

config('defaultStyle', 'solid'); //Optional, default is 'solid'
...
//Use default styles
<Icon.CheckSquare mask={Mask.Circle} {...props} />

//Explicitly set a style for this icon
<Icon.CheckSquare.regular mask={Mask.Circle.regular} {...props} />

```

##Layers

```
import {Icon, Layer} from "react-font-awesome-5";
...
<Layer size="2x">
    <Icon.File.regular />
    <Layer.Counter>123</Layer.Counter>
</Layer>
```

##Stacks
```
import {Icon} from "react-font-awesome-5";
...
<Icon.File stack />
```
