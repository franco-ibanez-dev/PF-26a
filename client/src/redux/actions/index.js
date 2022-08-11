import axios from "axios";
import { BASE_URL, fetch_users_action } from "../../api_url/api_url";
export const GET_BY_ID = "GET_BY_ID";
export const CLEAN_PRODUCT = "CLEAN_PRODUCT";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_BY_NAME = "FETCH_BY_NAME";
export const GET_SIZE = "GET_SIZE";
export const POST_PRDUCT = "POST_PRODUCT";

//carrito de compras
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const ADD_ONE_FROM_CART = "ADD_ONE_FROM_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const GET_INFO_Q_AND_A = 'GET_INFO_Q_AND_A';
export const GET_ANSWERS = 'GET_ANSWERS';
export const SET_PAYMENT_INFO = "SET_PAYMENT_INFO"

//Q and A
export const GET_Q_AND_A = "GET_Q_AND_A";

const URL_FOR_POST_PRODUCT = `${BASE_URL}/products/create`;
const URL_FOR_FETCH_PRODUCTS = `${BASE_URL}/products`;
const URL_FOR_FETCH_CATEGORIES = `${BASE_URL}/categories`;
const URL_FOR_GET_PRODUCTS_BY_ID = `${BASE_URL}/products/`;
const URL_FOR_BRING_SIZE = `${BASE_URL}/products/size/`;
const URL_FOR_GET_PRODUCTS_BY_NAME = `${BASE_URL}/products/search?name=`;
const URL_QUESTIONS = `${BASE_URL}/products/q&a/`;
const URL_ANSWERS = `${BASE_URL}/products/answer/`;
const URL_FOR_FETCH_ORDER_LIST = `${BASE_URL}/auth/compras/all`
const URL_GET_ANSWERS = `${BASE_URL}/admin/all/`;

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const ADD_FILTER = "ADD_FILTER";
export const REMOVE_FILTER = "REMOVE_FILTER";
export const SET_PRODUCTS_TO_DISPLAY = "SET_PRODUCTS_TO_DISPLAY";
export const SET_ORDER = "SET_ORDER";
export const SET_SEARCH_STATUS = "SET_SEARCH_STatus";
export const RESET_FILTER_ORDER = "RESET_FILTER_ORDER";
export const SESSION = "SESSION";
export const FETCH_ORDER_LIST = "FETCH_ORDER_LIST"
export const FETCH_CATEGORY = "FETCH_CATEGORY";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const GET_REVIEW = "GET_REVIEW"
export const GET_INFO_REVIEW = "GET_INFO_REVIEW"
export const postProduct = (payload) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(URL_FOR_POST_PRODUCT, payload);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};
//Order List from admin
export function fetchOrderList() {
  return async (dispatch) => {
    const { data } = await axios.get(URL_FOR_FETCH_ORDER_LIST);
    dispatch({
      type: FETCH_ORDER_LIST,
      payload: data
    })
  }
}


//QandA
export function getQandA(idProduct, obj) {
  return async (dispatch) => {
    let info = await axios.post(URL_QUESTIONS + idProduct, obj);
    // console.log("en la action: ", info.data)
    dispatch({
      type: GET_Q_AND_A,
      payload: info.data,
    });
  };
}




export function bringQandA(id) {
  return async (dispatch) => {
    let info = await axios.get(URL_QUESTIONS + id);
    // console.log("en la action: ", info.data)
    dispatch({
      type: GET_INFO_Q_AND_A,
      payload: info.data,
    });
  };
}

export function bringAnswers(id) {
  return async (dispatch) => {
    let info = await axios.get(URL_ANSWERS + id);
    // console.log("en la action: ", info.data)
    dispatch({
      type: GET_ANSWERS,
      payload: info.data,
    });
  };
}

export function answerQuestion(resolved) {
  return async (dispatch) => {
    let info = await axios.get(URL_GET_ANSWERS + resolved);
    // console.log("en la action: ", info.data)
    dispatch({
      type: ANSWER_QUESTION,
      payload: info.data,
    });
  };
}

export const GET_FAVORITES = "GET_FAVORITES";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
const URL_GET_FAVORITES_FROM_USER = `${BASE_URL}/favs/`;
const URL_POST_FAVORITE = `${BASE_URL}/favs/add`;
const URL_REMOVE_FAVORITE = `${BASE_URL}/favs/remove/`;

//carrito de compras FUNCIONES
export function addToCart(obj) {
  return {
    type: ADD_TO_CART,
    payload: obj,
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART,
  };
}

export function deleteFromCart(data) {
  return {
    type: REMOVE_FROM_CART,
    payload: data,
  };
}
export function changeQuantity(data, boolean) {
  if (boolean) {
    return {
      type: ADD_ONE_FROM_CART,
      payload: data,
    };
  } else {
    return {
      type: REMOVE_ONE_FROM_CART,
      payload: data,
    };
  }
}

export function fetchProducts() {
  return function (dispatch) {
    axios
      .get(URL_FOR_FETCH_PRODUCTS)
      .then((product) => {
        dispatch({
          type: FETCH_PRODUCTS,
          payload: product.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function fetchCategories() {
  return function (dispatch) {
    axios
      .get(URL_FOR_FETCH_CATEGORIES)
      .then((categories) => {
        let formattedCategories = categories.data.map((cat) => cat.name);
        dispatch({
          type: FETCH_CATEGORIES,
          payload: formattedCategories,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function fetchCategory() {
  return function (dispatch) {
    axios
      .get(URL_FOR_FETCH_CATEGORIES)
      .then((categories) => {
        dispatch({
          type: FETCH_CATEGORY,
          payload: categories.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function addFilter(filter) {
  return function (dispatch) {
    dispatch({
      type: ADD_FILTER,
      payload: filter,
    });
  };
}

export function removeFilter(filter) {
  return function (dispatch) {
    dispatch({
      type: REMOVE_FILTER,
      payload: filter,
    });
  };
}

export function setProductsToDisplay(products) {
  return function (dispatch) {
    dispatch({
      type: SET_PRODUCTS_TO_DISPLAY,
      payload: products,
    });
  };
}

export const getProductsById = (id) => {
  return async (dispatch) => {
    let pedidoApiId = await axios.get(URL_FOR_GET_PRODUCTS_BY_ID + id);
    dispatch({
      type: GET_BY_ID,
      payload: pedidoApiId.data,
    });
  };
};

export function cleanProduct() {
  return {
    type: CLEAN_PRODUCT,
  };
}

export function bringSize(id) {
  return async (dispatch) => {
    let size = await axios.get(URL_FOR_BRING_SIZE + id);
    // console.log("en la action: ", size.data)
    dispatch({
      type: GET_SIZE,
      payload: size.data,
    });
  };
}

export const getProductsByName = (name) => {
  return async (dispatch) => {
    try {
      const productsByName = await axios.get(
        URL_FOR_GET_PRODUCTS_BY_NAME + name
      );

      return dispatch({
        type: FETCH_BY_NAME,
        payload: productsByName.data,
      });
    } catch (error) {
      console.log(error, "||Error||");
    }
  };
};

export const loginCheck = (dispatch) => {
  let isLogged = false;

  let loggedUser = JSON.parse(localStorage.getItem("usuario"));
  if (loggedUser) {
    isLogged = true;
    dispatch({
      type: SESSION,
      payload: { data: loggedUser, session: isLogged },
    });
  } else {
    dispatch({
      type: SESSION,
      payload: { session: isLogged },
    });
  }
};

export function fetchUsers() {
  return async function (dispatch) {
    const result = await axios.get(fetch_users_action);
    return dispatch({ type: "FETCH_USERS", payload: result.data });
  };
}

export function setOrder(order) {
  return function (dispatch) {
    dispatch({
      type: SET_ORDER,
      payload: order,
    });
  };
}

export function setSearchStatus(status) {
  return function (dispatch) {
    dispatch({
      type: SET_SEARCH_STATUS,
      payload: status,
    });
  };
}

export function resetFilterOrder() {
  return function (dispatch) {
    dispatch({
      type: RESET_FILTER_ORDER,
    });
  };
}

export const getFavsFromUser = (id) => {
  return async (dispatch) => {
    let res = await axios.get(URL_GET_FAVORITES_FROM_USER + id);
    dispatch({
      type: GET_FAVORITES,
      payload: res.data.products,
    });
  };
};

export const removeFavsFromUser = (idUser, idProduct) => {
  return async (dispatch) => {
    await axios.delete(URL_REMOVE_FAVORITE + `${idUser}/${idProduct}`);
    dispatch({
      type: REMOVE_FAVORITE,
      payload: idProduct,
    });
  };
};

export const addFavsToUser = (data) => {
  return async (dispatch) => {
    let pedido = await axios.post(URL_POST_FAVORITE, data);
    dispatch({
      type: ADD_FAVORITE,
      payload: pedido.data.res.products,
    });
  };
};

export function setPaymentInfo(data) {
  return function (dispatch) {
    dispatch({
      type: SET_PAYMENT_INFO,
      payload: data
    })
  }
}

//-----------------------------RUTAS PARA LOS DETALLES DE LAS COMPRAS ESPECÍFICO DE UN USUARIO------------------------
// export const URL_INFO_PURCHASE = `${BASE_URL}/auth/compras/`
// export const INFO_PURCHASE = "INFO_PURCHASE"

// export const purchaseInfo = (id) => {
//   return async (dispatch) => {
//     let pedido = await axios.get(URL_INFO_PURCHASE + id)
//     dispatch({
//       type:INFO_PURCHASE,
//       payload: pedido.data
//     });
//   };
// }

export const URL_SINGLE_PURCHASE = `${BASE_URL}/auth/singlePurchase/`
export const SINGLE_PURCHASE = "SINGLE_PURCHASE"

export const singlePurchase = (id) => {
  return async (dispatch) => {
    let pedido = await axios.get(URL_SINGLE_PURCHASE + id)
    dispatch({
      type: SINGLE_PURCHASE,
      payload: pedido.data
    });
  };
}

export const getBuys = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/auth/compras/all`);
      return dispatch({ type: "GET_BUYS", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export function getReview(id, rev) {
  return async (dispatch) => {
    let review = await axios.post(`${BASE_URL}/products/review/` + id, rev);
    dispatch({
      type: GET_REVIEW,
      payload: review.data,
    });
  };
}

export function reviewProduct(id) {
  return async (dispatch) => {
    let info = await axios.get(`${BASE_URL}/products/reviews/` + id);

    dispatch({
      type: GET_INFO_REVIEW,
      payload: info.data,
    });
  };
}
