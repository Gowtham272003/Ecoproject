import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import PRODUCT_API, { CART_API } from "../api/productApi";

/* 🔹 Image mapping (must match backend product names) */
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
    "https://tse3.mm.bing.net/th/id/OIP.VUnwAYsaq78F9dpDxjsgJAHaHa?pid=Api&P=0&h=180",

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



function ProductList() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();

  // ✅ READ USER ID ONCE (NO CHECKS, NO BLOCKING)
  const userId = Number(localStorage.getItem("userId")) || 1;

  // ================= LOAD PRODUCTS =================
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    PRODUCT_API.get("")
      .then((res) => {
        setProducts(res.data);
        setAllProducts(res.data);
      })
      .catch(() => alert("Failed to load products"));
  };

  // ================= SEARCH =================
  const handleSearch = () => {
    if (!search.trim()) {
      setProducts(allProducts);
      return;
    }

    PRODUCT_API.get(`/search?name=${search}`)
      .then((res) => setProducts(res.data))
      .catch(() => alert("Search failed"));
  };

  // ================= FILTER BY RATING =================
  const handleFilter = (value) => {
    setRating(value);

    if (!value) {
      setProducts(allProducts);
      return;
    }

    PRODUCT_API.get(`/filter?rating=${value}`)
      .then((res) => setProducts(res.data))
      .catch(() => alert("Filter failed"));
  };

  // ================= SORT BY CARBON =================
  const handleSort = () => {
    PRODUCT_API.get("/sort/carbon")
      .then((res) => setProducts(res.data))
      .catch(() => alert("Sort failed"));
  };

  // ================= PRICE FILTER =================
  const handlePriceFilter = () => {
    let filtered = [...allProducts];

    if (minPrice) {
      filtered = filtered.filter(
        (p) => p.price >= parseFloat(minPrice)
      );
    }

    if (maxPrice) {
      filtered = filtered.filter(
        (p) => p.price <= parseFloat(maxPrice)
      );
    }

    setProducts(filtered);
  };

  // ================= ADD TO CART (FINAL, CLEAN) =================
  const addToCart = (productId) => {
    CART_API.post("/add", {
      userId: userId,
      productId: productId,
      quantity: 1,
    })
      .then(() => {
        alert("Added to cart");
      })
      .catch((err) => {
        console.error("ADD TO CART ERROR:", err.response?.data || err);
        alert("Failed to add to cart");
      });
  };

  return (
    <div style={{ padding: "25px" }}>
      <h2>🌿 Eco Product Catalog</h2>

      {/* ================= FILTER BAR ================= */}
      <div style={filterBar}>
        <div style={filterGroup}>
          <input
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={filterInput}
          />
          <button style={primaryBtn} onClick={handleSearch}>
            🔍 Search
          </button>
        </div>

        <div style={filterGroup}>
          <select
            value={rating}
            onChange={(e) => handleFilter(e.target.value)}
            style={filterSelect}
          >
            <option value="">All Ratings</option>
            <option value="A">A (Best)</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E (Worst)</option>
          </select>

          <button onClick={handleSort} style={secondaryBtn}>
            🌱 Lowest CO₂
          </button>
        </div>

        <div style={filterGroup}>
          <input
            type="number"
            placeholder="Min ₹"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={filterInputSmall}
          />

          <input
            type="number"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={filterInputSmall}
          />

          <button onClick={handlePriceFilter} style={primaryBtn}>
            💰 Apply
          </button>

          <button onClick={loadProducts} style={resetBtn}>
            ♻ Reset
          </button>
        </div>
      </div>

      {/* ================= PRODUCT GRID ================= */}
      <div style={gridStyle}>
        {products.map((p) => (
          <div
            key={p.id}
            style={cardStyle}
            onClick={() => navigate(`/products/${p.id}`)}
          >
            <img
              src={
                productImages[p.name?.toLowerCase()] ||
                "/images/default.png"
              }
              alt={p.name}
              style={imageStyle}
            />

            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>💰 ₹{p.price}</p>

            <span style={co2Badge}>
              🌱 CO₂: {p.carbonImpact} kg
            </span>

            <br /><br />

            <span
              style={{
                ...badgeStyle,
                background:
                  p.ecoRating === "A" || p.ecoRating === "B"
                    ? "green"
                    : p.ecoRating === "C"
                    ? "orange"
                    : "red",
              }}
            >
              Eco Rating: {p.ecoRating}
            </span>

            <br /><br />
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(p.id);
              }}
              style={cartBtn}
            >
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const filterBar = {
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
  alignItems: "center",
  background: "#f4fdf6",
  padding: "15px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  marginBottom: "20px",
};

const filterGroup = {
  display: "flex",
  gap: "8px",
  alignItems: "center",
};

const filterInput = {
  padding: "10px",
  width: "200px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const filterInputSmall = {
  padding: "10px",
  width: "100px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const filterSelect = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const primaryBtn = {
  padding: "10px 14px",
  background: "#2e7d32",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "10px 14px",
  background: "#1565c0",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const resetBtn = {
  padding: "10px 14px",
  background: "#9e9e9e",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const gridStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
};

const cardStyle = {
  border: "1px solid #ddd",
  padding: "20px",
  width: "280px",
  borderRadius: "12px",
  boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
  textAlign: "center",
  cursor: "pointer",
};

const imageStyle = {
  width: "200px",
  height: "200px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "10px",
};

const badgeStyle = {
  color: "white",
  padding: "6px 10px",
  borderRadius: "6px",
};

const co2Badge = {
  background: "#e8f5e9",
  color: "#2e7d32",
  padding: "4px 8px",
  borderRadius: "6px",
  fontSize: "12px",
};

const cartBtn = {
  background: "#ff9800",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default ProductList;