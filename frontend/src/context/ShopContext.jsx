import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();



  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
     
    if(token){
      try{
        await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}});
      }
      catch(err){
        console.log("error in addToCart in ShopContext ");
        toast.error(err.message);
        console.log(err)
      }
    }



  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        if (quantity > 0) {
          totalCount += quantity;
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if(token){
      try{
        await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}});
      }
      catch(err){
        console.log("error in updateQuantity in ShopContext ");
        // toast.error(err.message);
        console.log(err)
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (err) {}
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      // console.log(response.data);
      setProducts(response.data.products);
    } catch (err) {
      console.log("error in ShopContext getProductsData");
    }
  };

const getUserCart= async (token)=>{
  try{
    const response=await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}});
    if(response.data.success)
    {
      setCartItems(response.data.cartData)
    }
  }
  catch(err)
  {
    console.log("error in ShopContext getUserCart");
    
    console.log(err)
  }

}


  useEffect(() => {
    getProductsData();
  }, []);


  useEffect(()=>{
    if(!token && localStorage.getItem("token")){
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  })

  const value = {
    products,
    delivery_fee,
    currency,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
