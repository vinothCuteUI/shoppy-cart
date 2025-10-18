export const convertRupee = (number) =>{
    return new Intl.NumberFormat("en-IN").format(number)
}