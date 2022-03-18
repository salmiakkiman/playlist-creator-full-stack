class User {
  getUserId = () => sessionStorage.getItem("userId")
  getUserName = () => sessionStorage.getItem("userName")
  getUserEmail = () => sessionStorage.getItem('email')
  getUser = () => sessionStorage.getItem('user')
  setUserId = id => sessionStorage.setItem("userId", id)
  setUserName = name => sessionStorage.setItem("userName", name)
  setUserImages = images => sessionStorage.setItem("userImages", images)
  clearAll = () => sessionStorage.clear()
  initializeUser = user => {
    this.setUserId(user.id)  
    this.setUserName(user.display_name)
    this.setUserImages(user.images)

  }
}

export default User;
