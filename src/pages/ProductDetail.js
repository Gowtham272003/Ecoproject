import React, { useEffect, useState } from "react";
import PRODUCT_API from "../api/productApi";
import { useParams } from "react-router-dom";

/* 🔹 SAME image mapping as ProductList */
const productImages = {
  "eco bamboo toothbrush":
    "https://thumbs.dreamstime.com/b/bamboo-toothbrush-next-to-natural-toothpaste-bamboo-toothbrush-next-to-natural-toothpaste-promoting-eco-friendly-dental-care-370608000.jpg",

  "eco notebook":
    "https://www.mop.com.sg/wp-content/uploads/2020/10/eco-notepad-7-green-2.jpg",

  "eco pen":
    "https://m.media-amazon.com/images/I/81e+EvjO9hL._AC_.jpg",

  "reusable cloth bag":
    "https://m.media-amazon.com/images/I/81B8LVXmilL.jpg",

  "steel water bottle":
    "https://img.freepik.com/premium-photo/set-four-stainless-steel-water-bottles-different-colors_410516-52587.jpg",

  "eco cotton t-shirt":
     "https://lajolla.com/wp-content/uploads/2023/08/Eco-Friendly-Clothing-1024x576.jpg",

  "bamboo cutlery set":
     "https://ph-test-11.slatic.net/p/28fdb958acd11263daba79eeb486339b.jpg",

   "eco soap bar":
      "https://m.media-amazon.com/images/I/71y2lCfSYDL.jpg",
   "chemical floor cleaner":
    "https://cf.shopee.co.id/file/5549f0018b1aabbf05f5da43c63b2024",

  "styrofoam food container":
    "https://www.intcorecycling.com/pics/foam%20containers.jpg",

  "synthetic polyester shirt":
    "https://media.rs-online.com/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/Y2824270-01?pgw=1",

  "heavy chemical detergent":
    "https://tse1.mm.bing.net/th/id/OIP.spljwRPMUBm6niIQc602gQHaHp?pid=Api&P=0&h=180",
  "disposable plastic spoon set":
    "https://i5.walmartimages.com/asr/af0802f5-aefa-48a0-aac3-a68e8fe2bf81.274ea1e91484bb9ce1856f6ada2ec136.jpeg",
  "disposable styrofoam cup":
    "https://www.intcorecycling.com/pics/styrofoam-cups-181218.jpg",
  "pvc shower curtain":
     "https://5.imimg.com/data5/HN/UX/MY-950554/plastic-shower-curtains-500x500.jpg",
  "pvc electrical wire roll":
   "https://novo3d.in/wp-content/uploads/2020/10/ND263_1_CableRoll-1024x633.jpg",
   "bamboo toothbrush set":
   "https://m.media-amazon.com/images/I/818HQZIZgZL._SL1500_.jpg",
   "synthetic leather wallet":
   "https://tse2.mm.bing.net/th/id/OIP.x_83Yyac_afDzGJf2kFcbAHaE7?pid=Api&P=0&h=180",
   "electric kettle":
   "https://tse4.mm.bing.net/th/id/OIP.dQohyOt9BngnpbyvRXONtQHaHc?pid=Api&P=0&h=180",
   "cork yoga mat":
   "https://tse2.mm.bing.net/th/id/OIP.8fqZpRVL2ca5kYS1rWF1-wHaDb?pid=Api&P=0&h=180",
   "solar powered power bank":
    "https://us.solarpanelsnetwork.com/blog/wp-content/uploads/2021/04/YELOMIN-20000mAh-Portable-Outdoor-Solar-Power-Bank.jpg",
    "compostable plant pots":
    "https://www.coopersofstortford.co.uk/images/products/medium/L092i.jpg"

 
};

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    PRODUCT_API.get(`/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => alert("Product details failed"));
  }, [id]);

  if (!product) return <p style={{ padding: "25px" }}>Loading...</p>;

  return (
    <div style={{ padding: "25px", maxWidth: "600px" }}>
      <h2>{product.name}</h2>

      {/* ✅ IMAGE FIX */}
      <img
        src={
          productImages[product.name?.toLowerCase()] ||
          "https://via.placeholder.com/250?text=Eco+Product"
        }
        alt={product.name}
        style={{
          width: "250px",
          height: "250px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "15px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      />

      <p>{product.description}</p>
      <p>💰 Price: ₹{product.price}</p>

      <h4>🌍 Carbon Breakdown</h4>
      <p>🌱 CO₂ Impact: {product.carbonImpact} kg</p>
      <p>⭐ Eco Rating: {product.ecoRating}</p>
      
{/* ECO STATUS */}
<div style={{ marginTop: "10px" }}>
  {product.ecoCertified && product.ecoRating !== "D" && product.ecoRating !== "E" ? (
    <span style={{ color: "green", fontWeight: "bold" }}>
      🟢 Eco Certified
    </span>
  ) : (
    <span style={{ color: "red", fontWeight: "bold" }}>
      🔴 Not Eco Certified
    </span>
  )}
</div>

    </div>
  );
}

export default ProductDetail;
