<template>
  <div class="home">
    <h2 class="title">Post list</h2>
    <div class="posts">
      <article
        v-for="post in posts"
        :key="post"
      >
        <p v-text="post"></p>
      </article>
    </div>
    <Pagination
      :itemsTotal="pagination.itemsTotal"
      :itemsPerPage="pagination.perPage"
      :currentPage="pagination.currentPage"
      :buttonsMax="pagination.buttonsMax"
      :url="pagination.url"
      :queryParameter="pagination.queryParameter"
      :nextText="pagination.nextText"
      :previousText="pagination.previousText"
      :goToText="pagination.goToText"
      :pageText="pagination.pageText"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'posts',

  components: {
    Pagination,
  },

  data() {
    return {
      pagination: {
        buttonsMax: 9,
        url: this.$route.name,
        queryParameter: 'set',
        nextText: 'Next set',
        previousText: 'Previous set',
        goToText: 'Go to set',
        pageText: 'Set',
      },
      asyncData: null,
      readyPosts: null,
    };
  },

  computed: {
    posts() {
      return this.readyPosts;
    },
  },

  created() {
    const posts = [];
    for (let i = 0; i < 100; i += 1) {
      posts.push(`Post ${i + 1} content`);
    }
    this.asyncData = posts;

    this.getPosts(this.$route.query[this.pagination.queryParameter]);
  },

  beforeRouteUpdate(to, from, next) {
    this.getPosts(to.query[this.pagination.queryParameter]);
    next();
  },

  methods: {
    getPosts(pageParam) {
      // Get your async data here.
      const perPage = 3;
      const page = this.parseQueryParameter(pageParam);

      this.pagination.itemsTotal = this.asyncData.length;
      this.pagination.perPage = perPage;
      this.pagination.currentPage = page;
      this.readyPosts = this.asyncData.slice(perPage * (page - 1), perPage * page);
    },
    parseQueryParameter(parameter) {
      return parameter != null ? parseInt(parameter, 10) : 1;
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
  .posts {
    margin: 30px 0;
  }
</style>
