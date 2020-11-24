## Project specific file structure
```
src/
    images/                     # static images
    components/
        */
            *.js                # presenter
            *-view.js           # view
        ui/                     # pure ui components, only views
            *.js
        index.js                # import and export all components here
    reducers/
        *.js
    styles/
        sass/
            */
                _*.scss         # a file for each component or module
                _index.scss     # import all files in directory
            style.scss          # import frameworkds and directory indexes
```