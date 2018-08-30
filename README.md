# vue-bulma-paginate

## Install via NPM:
```
npm < 5.0:
npm install vue-bulma-paginate --save
npm >= 5.0:
npm install vue-bulma-paginate
```

## Usage
**Props**

|Prop|Type|Required|Default|Description|
|----|----|--------|-------|-----------|
|itemsTotal|Number|True|0|Number of elements to paginate|
|itemsPerPage|Number|True|1|Number of items per page|
|currentPage|Number|True|1|Current page|
|buttonsMax|Number|False|7|Maximum number of buttons to show including first and last page (must be odd)|
|url|String|True||Vue Router named route|
|queryParameter|String|False|page|Custom query parameter (e.g. example.com/gallery?**images-set**=2)|
|nextText|String|False|Next|Custom text for next button|
|previousText|String|False|Previous|Custom text for previous button|
|goToText|String|False|Goto page|Custom text for aria-label attribute on "a" tags|
|pageText|String|False|Page|Custom text for aria-label attribute on current page "a" tag|

## Example
```
import Pagination from 'vue-bulma-paginate';
...
components: {
  Pagination,
}
...
<Pagination
  :itemsTotal="pagination.itemsTotal"
  :itemsPerPage="pagination.perPage"
  :currentPage="pagination.currentPage"
  :buttonsMax="5"
  :url="this.$route.name"
  :queryParameter="images-set"
  :nextText="Next set"
  :previousText="Previous set"
  :goToText="Go to the images set"
  :pageText="Images set"
/>
```
A full example is provided at the [Demo](https://jgrandar.github.io/vue-bulma-paginate/).
