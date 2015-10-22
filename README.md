# bishops-place

## Workflow Guide
We are setup with `gulp` as our task-runner and workflow systematizer of choice. It will handle automating much of the tedious and banal tasks we'd rather not waste time with. Here'sa quick run-through of what tasks are setup, what they do, and what options you have in them.
### `gulp pages`
> **TL;DR** Deals with HTML stuff.

Loads JSON data from `./src/assets/data`; renders HTML files optionally templated via [Nunjucks](http://mozilla.github.io/nunjucks/); minifies HTML; moves files to `./app/` for you.
### `gulp styles`
> **TL;DR** Does stuff with CSS.

Inlines globbable imports; compiles SCSS; minifies CSS; moves it to `./app/assets/css` for you.
### `gulp scripts`
> **TL;DR** Works Javascript magic.

Concatenates Javascript files, even placing third-party stuff first; minifies the super file; moves it to `./app/assets/js/` for you.
> **Note** Third -party stuff be prefixed with `__` since files are concatenates in the order they're found in the directory.

### `gulp images`
No **TL;DR** neeeded. It just compresses files and moves them to `./app/assets/img/` for you.
### `gulp serve`
> **TL;DR** You should fully read this one. &#9759;&#9759;

This one is variable; it even takes flags for configurability. Essentially, it creates a static file server and automatically loads your changes in the browser. It watches your files and whenever one's changed, it runs the appriopriate task from those above and **streams** the changes in. Some changes will call for a page refresh, but most will happen without one necessary. *It can do a bit more too, so check out the option flags below.*

**`gulp serve -o`** Opens the page in Google Chrome when the server starts.

**`gulp serve --cross`** Same as `gulp server -o` but opens Chrome, Firefox, and Safari all at once.

**`gulp serve --dev`** The same as regular `gulp serve` &mdashl just specifies local environment.

**`gulp serve --stage`** Skips starting a server and performs a one-off FTP transfer to the staging server.

**`gulp serve --pro`** Skips starting a server and performs a one-off FTP transfer to the live server.

> Servers and FTP are configured in `server.json` &mdash; it's **ignored by git** since it contains sensitive info.
