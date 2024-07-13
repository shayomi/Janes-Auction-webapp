// pages/profile/index.js
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Profile() {
  const searchParams = useSearchParams();
  const section = searchParams.get("orders");

  return (
    <div>
      <h1>Profile Page</h1>
      <nav>
        <ul>
          <li>
            <Link href="/profile/orders">
              <h2>Orders</h2>
            </Link>
          </li>
          <li>
            <Link href="/profile/products">
              <h2>Products</h2>
            </Link>
          </li>
        </ul>
      </nav>
      {section === "orders" && <Orders />}
      {section === "products" && <Products />}
    </div>
  );
}

function Orders() {
  return <div>Orders Section</div>;
}

function Products() {
  return <div>Products Section</div>;
}
