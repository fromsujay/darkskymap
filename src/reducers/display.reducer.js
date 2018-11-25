export default function(value=false, action) {
  if(action.type === 'swap') {
    
      return !action.switchStatus
  } else {
      return value;
  }
}
