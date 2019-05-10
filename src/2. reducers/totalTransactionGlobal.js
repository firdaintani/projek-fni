const INITIAL_STATE={total:0}

export default (state=INITIAL_STATE, action)=>{
 if(action.type==='TOTAL_PAYMENT'){
    return {...INITIAL_STATE, total : action.payload}
}
else{
return state
}
}
