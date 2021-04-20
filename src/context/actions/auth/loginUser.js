
export default ({password, username}) => (dispatch) => {

  dispatch({
    type: 'start',
  });
  if(username=='123' && password=='123') {
    console.log("aaaa");
    dispatch({

      type: 'LoginSuccess',
    });
  }
  
 
};
