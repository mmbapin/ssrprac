import fs from "fs/promises"
import path from "path"
import Link from 'next/link'
function HomePage(props) {
  const { products } = props
  return (
    <ul>
      {products?.map((product, index) => (
        <li key={index}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  console.log("Re-generated.");
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)
  console.log(data);
  if(data.products.length === 0) {
    return {notFound: true}
  }
  return {
    props: {
      products: data.products
    },
    revalidate: 1
  }
}

export default HomePage;
