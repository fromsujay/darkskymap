export default function(value=false, action) {
  if(action.type === 'swap') {
    console.log('action.switchStatus',!action.switchStatus);
      return !action.switchStatus
  } else {
      return value;
  }
}
