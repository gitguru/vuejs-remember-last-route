<template>
  <div class="container">
    <h2>Post detail</h2>
    <div v-if="User">
      <p>Hi {{ User }}</p>
    </div>

    <div id="post-div">
      <p>{{ post.id }}</p>
      <p>{{ post.title }}</p>
      <p>{{ post.write_up }}</p>
      <p>Written By: {{ post.author.username }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Post",
  components: {},
  data() {
    return {
      post: {
        title: "",
        write_up: "",
        author: {
          username: ""
        }
      },
    };
  },
  created: function() {
    // a function to call getpost action
    //this.post = this.GetPost(this.$route.params.id)
    this.getPost(this.$route.params.id);
  },
  computed: {
    ...mapGetters({ User: "StateUser" }),
  },
  methods: {
    ...mapActions(["GetPost"]),
    async getPost(id) {
      this.post = await this.GetPost(id);
    }
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
#post-div {
  border: 3px solid #000;
  width: 500px;
  margin: auto;
  margin-bottom: 5px;
}
</style>
