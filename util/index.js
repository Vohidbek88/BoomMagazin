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
}