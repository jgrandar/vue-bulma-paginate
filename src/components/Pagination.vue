<template>
  <nav
    v-if="showPagination"
    class="pagination"
    role="navigation"
    aria-label="pagination"
  >
    <button
      :disabled="currentPage < 2"
      class="pagination-previous"
      type="button"
      @click="previous"
      v-text="previousText"
    />
    <button
      :disabled="currentPage > pagesTotal - 1"
      class="pagination-next"
      type="button"
      @click="next"
      v-text="nextText"
    />
    <ul class="pagination-list">
      <li v-if="showFirstPageButton">
        <router-link
          :to="{ name: url, query: { [queryParameter]: 1 } }"
          :aria-label="`${goToText} 1`"
          class="pagination-link"
          v-text="1"
        />
      </li>
      <li v-if="buttons[0] > 2">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li
        v-for="button in buttons"
        :key="button"
      >
        <router-link
          :to="{ name: url, query: { [queryParameter]: button } }"
          :class="{ 'is-current': button === currentPage }"
          :aria-label="`${button === currentPage ? pageText : goToText} ${button}`"
          :aria-current="button === currentPage ? 'page' : false"
          class="pagination-link"
          v-text="button"
        />
      </li>
      <li v-if="buttons[buttons.length - 1] < pagesTotal - 1">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-if="showLastPageButton">
        <router-link
          :to="{ name: url, query: { [queryParameter]: pagesTotal } }"
          :aria-label="`${goToText} ${pagesTotal}`"
          class="pagination-link"
          v-text="pagesTotal"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    itemsTotal: {
      type: Number,
      default: 0,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 1,
      required: true,
    },
    currentPage: {
      type: Number,
      default: 1,
      required: true,
    },
    buttonsMax: {
      type: Number,
      default: 7,
      validator: value => value > 4 && Math.abs(value % 2) === 1,
    },
    url: {
      type: String,
      default: 'items',
    },
    queryParameter: {
      type: String,
      default: 'page',
    },
    nextText: {
      type: String,
      default: 'Next',
    },
    previousText: {
      type: String,
      default: 'Previous',
    },
    goToText: {
      type: String,
      default: 'Goto page',
    },
    pageText: {
      type: String,
      default: 'Page',
    },
  },

  computed: {
    pagesTotal() {
      return Math.ceil(this.itemsTotal / this.itemsPerPage);
    },

    buttonsTotal() {
      return this.pagesTotal > this.buttonsMax - 2 ? this.buttonsMax - 2 : this.pagesTotal;
    },

    showPagination() {
      return this.itemsTotal && this.buttonsTotal > 1;
    },

    showFirstPageButton() {
      return this.buttons[0] > 1;
    },

    showLastPageButton() {
      return this.buttons[this.buttons.length - 1] < this.pagesTotal;
    },

    buttons() {
      let firstButton = this.currentPage - Math.floor(this.buttonsTotal / 2);
      let lastButton = firstButton + (this.buttonsTotal - Math.ceil(this.buttonsTotal % 2));

      if (firstButton < 1) {
        firstButton = 1;
        lastButton = firstButton + (this.buttonsTotal - 1);
      }
      if (lastButton > this.pagesTotal) {
        lastButton = this.pagesTotal;
        firstButton = lastButton - (this.buttonsTotal - 1);
      }

      const pages = [];
      for (let page = firstButton; page <= lastButton; page += 1) {
        pages.push(page);
      }

      return pages;
    },
  },

  methods: {
    goPage(page) {
      this.$router.push({ name: this.url, query: { [this.queryParameter]: page } });
    },
    previous() {
      if (this.currentPage > 1) {
        this.goPage(this.currentPage - 1);
      }
    },
    next() {
      if (this.currentPage < this.pagesTotal) {
        this.goPage(this.currentPage + 1);
      }
    },
  },
};
</script>
