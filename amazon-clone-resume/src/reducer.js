export const initialState = {
    basket: [],
    user: null  // Setting a default user to be null i.e., no logged-in user
};

// Selector (IMPORTANT CONCEPT): Used for showing the total of the price of all the items in the basket.
export const getBasketTotal = (basket) => basket.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
        
        case 'REMOVE_FROM_BASKET':
            // Store the index of the first item with the matching id   .
                const index = state.basket.findIndex(
                    (basketItem) => basketItem.id === action.id
                );

            let newBasket = [...state.basket]; // Copy contents of basket to a temporary variable

            if (index >= 0) {
                newBasket.splice(index, 1); // Remove 1 item of index 'index' from the basket in temporary variable.

            }
            else {
                console.warn(`Can't remove product (id: ${action.id}) as it is not in the basket.`)
            }
            
            return {
                ...state,
                basket: newBasket
            }

        case 'SET_USER': 
            return {
                ...state,
                user: action.user
            } 
        
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }    
            
        default:
            return state;
    }
};

export default reducer;