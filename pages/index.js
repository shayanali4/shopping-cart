import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { getCountContext, setCountContext } from "../pages/_app.js";

export async function getStaticProps() {
  // called once at page reload to fetch store data
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return {
    props: {
      // will be passed to page component as props
      data, // data is  a local variable in getStaticProps from the fetch
    },
  };
}

export default function Home({ data }) {
  const [carter, setCarter] = useState([]); // add to cart list saved here

  let setCount = useContext(setCountContext);
  let getCount = useContext(getCountContext);

  const addToCart = (product) => {
    let productDetails = {
      image: product.image,
      id: product.id,
      title: product.title,
      rate: product.rating.rate,
      count: product.rating.count,
      price: product.price,
      qty: 1,
    };
    const productExist = carter.find((x) => x.id === productDetails.id);
    if (productExist) {
      setCarter(
        carter.map((x) =>
          x.id === productExist.id
            ? { ...productExist, qty: productExist.qty + 1 }
            : x
        )
      );
    } else {
      setCarter([...carter, { ...productDetails, qty: 1 }]);
    }

    // //let clickCount = 1
    // let productIsInCart = false
    // carter.forEach(x => {    //if the product is already in your cart then add to qty dropdown in cart
    //   if (x.id === product.id) {
    //     // localStorage.setItem('count', clickCount++)
    //     productIsInCart = true
    //   }
    // })
    // if (!productIsInCart) {
    //   setCarter([...carter, productDetails])
    // }
  };
  console.log("cart==>", carter);

  useEffect(() => {
    // at initial launch get products from local storage and store in carter
    // localStorage.clear();
    if (localStorage.getItem("products") !== null) {
      setCarter(JSON.parse(localStorage.getItem("products")));
    }
  }, []);

  useEffect(() => {
    // anytime there is a change to carter i want it to update the localstorage with carter
    localStorage.setItem("products", JSON.stringify(carter));
    setCount(carter.length)
  }, [carter]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping cart</title>
      </Head>

      <div className="container mx-auto bg-white">
        <div className="max-w-2xl mx-auto py-8 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data.map((product, i) => (
              <div key={i} className="productContainer">
                <Link href={`/product/${product.id}`}>
                  <a className="hover:opacity-80 hover:underline">
                    {" "}
                    {/*Create dynamic links based on wahts clicked */}
                    <Image
                      className=""
                      alt="Image Unavailable"
                      src={product.image}
                      width={300}
                      height={300}
                    />
                    <h4 className="text-sm text-gray-700">{product.title}</h4>
                    <h5 className="text-lg font-medium ">${product.price}</h5>
                    <h6 className="no-underline hover:no-underline">
                      {product.rating.rate}/5 of {product.rating.count} Reviews
                    </h6>{" "}
                    {/*Add stars to */}
                  </a>
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
