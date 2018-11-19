export default function(logged, action) {
  if(action.type === 'display') {
      return logged = true
  } else {
      return logged = false
  }
}


//initialiser l'état (premier argument)
