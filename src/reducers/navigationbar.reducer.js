export default function(logged=false, action) {
  if(action.type === 'display') {

      return  true

  } else {
      return logged
  }
}


//initialiser l'état (premier argument)
