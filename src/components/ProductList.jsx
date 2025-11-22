import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Laptop Gamer",
    price: 3200,
    image: "https://via.placeholder.com/300"
  },
  {
    id: 2,
    name: "Mouse Inalámbrico",
    price: 49,
    image: "https://via.placeholder.com/300"
  },
  {
    id: 3,
    name: "Teclado Mecánico RGB",
    price: 150,
    image: "https://via.placeholder.com/300"
  }
];

export default function ProductList() {
  return (
    <div className="products-container">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
