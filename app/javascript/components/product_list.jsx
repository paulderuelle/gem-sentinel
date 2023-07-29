// import React, { useState, useEffect } from 'react';
// import ProductCard from './product_card.jsx';
// import Containers from './containers.jsx'

// function ProductList() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//       getProducts();
//   }, []);

//   const getProducts = () => {
//       const getProductsUrl = '/api/v1/products';

//       fetch(getProductsUrl)
//           .then((response) => response.json())
//           .then((data) => {
//               setProducts(data);
//           });
//   }

//   const mainContent = "hello"

//   return (<MainContainer content={mainContent} />);
// }


// export default ProductList;
