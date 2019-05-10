import {combineReducers} from 'redux'
import userGlobal from './userGlobal'
import totalPaymentGlobal from './totalTransactionGlobal'
export default combineReducers({
 
        user: userGlobal,
        totalPayment : totalPaymentGlobal
 
})