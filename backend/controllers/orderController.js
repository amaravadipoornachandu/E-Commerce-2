import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "Stripe";
import "dotenv/config";

//global variables
const currency='usd'
const deliveryCharge=10
//gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing orders using COD

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "order placed successfully" });
  } catch (err) {
    console.log("error in placeOrder controller");
    res.json({ success: false, message: err.message });
  }
};



//placing orders using stripe..................................................................
const placeOrderStripe = async (req, res) => {
  try {
    const {userId,items, amount, address } = req.body;
    const { origin } = req.headers;
     // From auth middleware

    

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (err) {
	console.log(err)
    console.log("error in stripe integration", err);
    res.json({ success: false, message: err.message });
  }
};

//verify stripe........................................................................................
const verifyStripe=async(req,res)=>{
	const {orderId,success,userId}=req.body;
	try {
		if(success==='true')
		{
			await orderModel.findByIdAndUpdate(orderId,{payment:true});
			await userModel.findByIdAndUpdate(userId,{cartData:{}});
			res.json({success:true,message:"order placed successfully"});
		}
		else
		{
			await orderModel.findByIdAndDelete(orderId);
			res.json({success:false,message:"payment failed"});
		}
	} catch (err) {
		
		console.log("error in verifyStripe controller");
		res.json({ success: false, message: err.message });
	}
}

//placing orders using razorpay
const placeOrderRazorpay = async (req, res) => {};

//all orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (err) {
    console.log("error in allOrders controller");
    res.json({ success: false, message: err.message });
  }
};

//user order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (err) {
    console.log("error in userOrders controller");
    res.json({ success: false, message: err.message });
  }
};

//update orders status from admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "status updated successfully" });
  } catch (err) {
    console.log("error in updateStatus controller");
    res.json({ success: false, message: err.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe
};
