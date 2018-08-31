<template>
  <div>
    <h2 class="title">Configuration</h2>
    <div class="field is-grouped">
      <div class="control">
        <label class="label">Items Total</label>
        <input
          v-model.number="itemsTotal"
          class="input"
          type="number"
          @change="checkLastPage"
        >
      </div>
      <div class="control">
        <label class="label">Items per page</label>
        <input
          v-model.number="itemsPerPage"
          class="input"
          type="number"
          @change="checkLastPage"
        >
      </div>
      <div class="control">
        <label class="label">Max buttons</label>
        <input
          v-model.number="buttonsMax"
          class="input"
          type="number"
          min="5"
          title="Odd numbers only"
        >
      </div>
    </div>
    <hr>
    <h2 class="title">Post list</h2>
    <div class="posts">
      <article
        v-for="(item, index) in items"
        :key="index"
      >
        <p v-text="item"></p>
      </article>
    </div>
    <Pagination
      :itemsTotal="itemsTotal"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      :buttonsMax="buttonsMax"
      :url="url"
      :queryParameter="queryParameter"
      :nextText="pagination.nextText"
      :previousText="pagination.previousText"
      :goToText="pagination.goToText"
      :pageText="pagination.pageText"
    />
    <nav>
      <a href="https://github.com/jgrandar/vue-bulma-paginate">Go back to GitHub repository</a>
    </nav>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Posts',

  components: {
    Pagination,
  },

  data() {
    return {
      itemsTotal: 100,
      itemsPerPage: 3,
      buttonsMax: 9,
      currentPage: 1,
      queryParameter: 'set',
      url: this.$route.name,
      pagination: {
        nextText: 'Next set',
        previousText: 'Previous set',
        goToText: 'Go to set',
        pageText: 'Set',
      },
    };
  },

  computed: {
    items() {
      return this.allItems.slice(
        this.itemsPerPage * (this.currentPage - 1),
        this.itemsPerPage * this.currentPage,
      );
    },
    allItems() {
      const items = [];

      for (let i = 0; i < this.itemsTotal; i += 1) {
        items.push(`Post ${i + 1} content`);
      }

      return items;
    },
    lastPage() {
      return Math.ceil(this.allItems.length / this.itemsPerPage);
    },
  },

  watch: {
    buttonsMax(newValue, oldValue) {
      if (newValue % 2) {
        return;
      }
      if (newValue < oldValue) {
        this.buttonsMax = newValue - 1;
      }
      if (newValue > oldValue) {
        this.buttonsMax = newValue + 1;
      }
    },
  },

  beforeRouteUpdate(to, from, next) {
    this.setCurrentPage(to.query[this.queryParameter]);
    next();
  },

  methods: {
    setCurrentPage(parameter) {
      let page = 1;
      if (parameter != null) {
        page = parseInt(parameter, 10);
      }
      this.currentPage = page;
    },
    checkLastPage() {
      if (this.currentPage > this.lastPage) {
        this.$router.push({
          name: this.url,
          query: { [this.queryParameter]: this.lastPage },
        });
      }
    },
  },
};
</script>

<style>
  article {
    background-color: azure;
    border: 1px solid #000000;
    margin-bottom: 15px;
    padding: 15px;
  }
  h2 {
    text-align: center;
  }
  nav {
    margin-top: 30px;
  }
  .posts {
    margin: 30px 0;
  }
</style>
