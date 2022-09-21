import React, { Fragment } from 'react'
import path from "path"
import fs from "fs/promises"

const ProductDetailsPage = (props) => {
  const {loadedProduct} = props

  // if(!loadedProduct){
  //   return <p> Loading...</p>
  // }
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  )
}


const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)

  return data;
}

export async function getStaticProps(context){
  const {params} = context
  const productId = params.pid
  
  const data = await getData()
  
  console.log(data);
  const product = data.products.find(product => product.id === productId)

  if(!product){
      return {
        notFound: true
      }
  }

  return {
    props: {
      loadedProduct : product
    }
  }
}

export async function getStaticPaths() {
  const data = await getData()
  const ids = data.products.map(product => product.id)

  const pathsWithParams = ids.map((id) => ({params: {pid: id}}))
  return{
    paths: pathsWithParams,
    fallback: false
  }
}

export default ProductDetailsPage