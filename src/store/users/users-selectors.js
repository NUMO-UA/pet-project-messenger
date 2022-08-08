  export const selectAllUsers  = (state) => state.users;


  export const selectVisibleCUsers = (state, {search = '', email = ''}) => {


    return state.users.usersData.filter(
      usersData => (
        usersData.email.toLowerCase().includes(search.toLowerCase())
      )
    )
  }