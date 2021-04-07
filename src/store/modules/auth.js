// import axios from "axios";

const state = {
  user: null,
  posts: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StatePosts: (state) => state.posts,
  StateUser: (state) => state.user,
};

const actions = {
  async Register({dispatch}, form) {
    // await axios.post('register', form)
    let UserForm = new FormData()
    UserForm.append('username', form.username)
    UserForm.append('password', form.password)
    await dispatch('LogIn', UserForm)
  },

  async LogIn({commit}, user) {
    // await axios.post("login", user);
    await commit("setUser", user.get("username"));
  },

  async CreatePost({ dispatch }, post) {
    // await axios.post("post", post);
    console.log('creating new post....', post);
    return await dispatch("GetPosts");
  },

  async GetPosts({ commit }) {
    // let response = await axios.get("posts");
    // commit("setPosts", response.data);
    commit("setPosts", [
        {'id': 1, 'author': {'username': 'fs-poc1'}, 'title': 'title1', 'write_up': 'write_up1'},
        {'id': 2, 'author': {'username': 'fs-poc2'}, 'title': 'title2', 'write_up': 'write_up2'}
    ]);
  },

  async GetPost({ state }, id) {
    if (state.posts) {
        let post = state.posts.find(function(post) {
            if (post.id == id) {
                return true;
            }
        });
        return post;
    } else {
        throw new Error('Post does not exists');
    }
  },

  async LogOut({ commit }) {
    let user = null;
    commit("logout", user);
  },
};

const mutations = {
  setUser(state, username) {
    state.user = username;
  },

  setPosts(state, posts) {
    state.posts = posts;
  },
  logout(state, user) {
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
