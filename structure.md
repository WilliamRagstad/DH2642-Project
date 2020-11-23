## Project specific file structure
```
src/
    images/                     # static images
    components/
        */
            *.js                # presenter
            *-view.js           # view
            index.js            # pass through presenter
        ui/                     # pure ui components, only views
            *.js
        index.js                # import all components here
    reducers/
        *.js
    styles/
        sass/
            */
                _*.scss         # a file for each component or module
            style.scss          # import all _*.scss files here
```