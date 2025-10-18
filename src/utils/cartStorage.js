export const loadLocalStorageCart = () => {
    const cart = localStorage.getItem("cart")
    return cart ? JSON.parse(cart) : []
}

export const updateLocalStorageCart = (cartItems) => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
}

export const cleatLocalStorageCart = () => {
    localStorage.removeItem("cart")
}