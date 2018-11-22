export default function(display=false, action) {
  if(action.type == 'swap') {
    console.log('action.switchStatus',!action.switchStatus);
      return !action.switchStatus
  } else {
      return display;
  }
}
