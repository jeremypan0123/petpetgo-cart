import Head from 'next/head';

import ProductList from '../components/ProductList';
import { getLayout } from '../layouts/Visitor';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Petpetgo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>Products</p>
        <ProductList />
      </main>
    </div>
  );
}

Home.getLayout = getLayout;
