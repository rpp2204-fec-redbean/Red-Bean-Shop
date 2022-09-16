import React, { useState, useEffect } from 'react';

import axios from 'axios';
// import url from 'url';
import Overview from './overview_module/Overview.jsx';
import QandAModule from './questions_answers_module/QandAModule.jsx';
import ReviewsModule from './reviews_module/ReviewsModule.jsx';
import Topbar from './overview_module/Topbar.jsx';

function App() {
  const [product_id, setProduct_id] = useState(71701);
  const [productName, setProductName] = useState('Heir Force Ones');

  const queryParams = {
    product_id: 71701,
  };

  const params = new URLSearchParams(queryParams);

  useEffect(() => {
    axios.get(`/products/?${params}`).then((res) => console.log(res));
  });

  return (
    <div>
      <ReviewsModule product_id={product_id} product_name={productName} />
    </div>
  );
}

export default App;
