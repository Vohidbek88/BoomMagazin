import moment from "moment"
export default {
    ifequal(a,b,option){
        if(a==b){
            return option.fn(this)
        }
        return option.inverse(this)
    },

    getName(lastName,firstName){
        return lastName.charAt(0)+firstName.charAt(0)
    },
    formatDate(date){
return moment(date).format("DD, MMM,YYYY")
    }
}