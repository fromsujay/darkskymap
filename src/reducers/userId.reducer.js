export default function(userId = '', action) {
  if(action.type === 'display') {

      return  action.userId

  } else {
      return userId
  }
}
