const state = {
    lastRoute: null,
  };
  
  const getters = {
    hasLastRoute: (state) => !!state.lastRoute,  
    StateLastRoute: (state) => state.lastRoute,
  };
  
  const actions = {
    async RegisterLastRoute({commit}, route) {
      await commit("setLastRoute", route);
    },
    async ResetLastRoute({commit}) {
        let route = null;
        await commit("setLastRoute", route);
      },
    
  };
  
  const mutations = {
    setLastRoute(state, route) {
      console.log('last route: ', route);
      state.lastRoute = route;
    },
 
  };
  
  export default {
    state,
    getters,
    actions,
    mutations,
  };
  