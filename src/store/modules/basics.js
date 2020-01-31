const newH5 = {
    state: {
        nowFooter: 0,
        userIDList: []
    },
    mutations: {
        'SET_NOWFOOTER':(state,newNowFooter) =>{
            state.nowFooter = newNowFooter;
        },
        'SET_USERIDLIST':(state,newUserIDList) =>{
            state.userIDList = newUserIDList;
        }
    },
    actions: {
        set_nowFooter: ({commit}, newNowFooter) => {
            return commit('SET_NOWFOOTER',newNowFooter);
        },
        set_userIDList: ({commit}, newUserIDList) => {
            return commit('SET_USERIDLIST',newUserIDList);
        }
    }
}
export default newH5
