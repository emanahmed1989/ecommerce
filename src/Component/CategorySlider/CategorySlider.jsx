import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import UseApi from "../../Hooks/UseApi";

export default function CategorySlider() {
  // let [categoryList, setCategoryList] = useState(null);
  // function getCategoryList() {
  //   axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then((req) => {
  //     setCategoryList(req.data.data)
  //   }).catch((error) => {
  //     console.log(error.response.message)
  //   });
  // }
  // useEffect(()=>{
  //   getCategoryList();
  // },[])
  let {data}=UseApi('categories');

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    arrows: false
  };
  return (
    <div className="my-2">
      
        <Slider {...settings} >
          {data?.data?.data?.map((element) => {
            let { _id, image,name } = element
            return (<div key={_id}>
              <img src={image} alt="" className="w-full h-48 object-cover object-top" />
              <h5>{name}</h5>
            </div>)
          })}


        </Slider>
     

    </div>

  );
}
