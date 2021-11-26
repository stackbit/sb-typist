# stackbit-typist

This package provide **TypistSection** - a Stackbit V2 component wrapping [react-typist](https://www.npmjs.com/package/react-typist), visually styled inside a terminal window-like element (adopted from the Tailwind component [Simple Terminal](https://tailwindcomponents.com/component/terminal)).

This package should be used alongside the standard `stackbit-components` package that comes bundled with our base themes.

## Setup

### Installing the package

If developing you project locally, run:

```shell
npm install stackbit-typist
```

Note that when pushing changes upstream, the visual editor will take some time to update installed packages in your project.

If working with the online code editor, add a dependency inside `package.json` directly: under `dependencies` add the line `"stackbit-typist": "^1.0.0",` and save the file.

### Registering components

Registering the components (currently just one...) in this package in addition to built-in ones is simple:

In the file `src/components/register-components.js` in your project (assuming the project is based on one of our themes), import this package's component map and add it to the registered list. Here's how the file should look like (two lines are new):

```js
import dynamic from 'next/dynamic';
import { registerComponents } from '@stackbit/components';
import { componentsMap } from '@stackbit/components/dist/components-map';
import typistComponents from 'stackbit-typist'; // Get component map from package

registerComponents({
    ...componentsMap,
    ...typistComponents // Add to registered components
});
```

This will map the model name `TypistSection` to the React functional component (imported dynamically).

### Adding the CSS file (optional)

To provide the nice blinking cursor effect, react-typist provides a vanilla CSS file. Since Next.js does not allow global CSS files loaded outside of the App module, if you want this effect you'll need to add the following line to your `src/pages/_app.js` file:

```js
import 'stackbit-typist/dist/Typist.css';
```

## Using the component

Now, head over to the visual editor and add you should be able to add a new section type to pages: **Typist**.

Feel free to add items to the elements fields and see how it works! Every time you modify any of the elements within the component, the animation will re-run to reflect your changes.

## TBD's

* **Known issue:** Currently, specific elements within the component typically cannot be highlighted even though they're annotated. This is because Stackbit doesn't know to update its highlights once the animation completes. However, edit anything in the page and this will suddenly work! Note that highlighting the full component should always work.
* **Limitation:** The height of the component is currently fixed :-/ since at the start of the animation the component is empty, automatic height would make it grow as lines are added. TBD consider best approach for this :-)
* **Improvement:** Add user-controlled styling in the model & component.
* **Improvement:** Provide a syntax-highlighting verion?