export default function(userId = '', action) {
  if(action.type === 'display') {
    userId = action.userId;
      return  userId

  } else {
      return userId 
  }
}
