import { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  tag?: string;
  qty: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Throne of Grace Classic Tee',
    price: 29.99,
    category: 'Apparel',
    tag: 'Bestseller',
    qty: 12,
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&h=900&fit=crop&auto=format',
  },
  {
    id: 2,
    name: 'Ministry Hoodie — Deep Teal',
    price: 54.99,
    category: 'Apparel',
    tag: 'New',
    qty: 8,
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=900&h=900&fit=crop&auto=format',
  },
  {
    id: 3,
    name: 'Gold Crown Snapback Cap',
    price: 24.99,
    category: 'Accessories',
    qty: 20,
    image:
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&h=900&fit=crop&auto=format',
  },
  {
    id: 4,
    name: 'Scripture Journal — Leather Cover',
    price: 19.99,
    category: 'Books & Media',
    tag: 'Popular',
    qty: 15,
    image:
      'https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?w=900&h=900&fit=crop&auto=format',
  },
  {
    id: 5,
    name: 'To-Go Chapel Tote Bag',
    price: 16.99,
    category: 'Accessories',
    qty: 30,
    image:
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&h=900&fit=crop&auto=format',
  },
  {
    id: 6,
    name: 'Ministry Coffee Mug — Gold Logo',
    price: 14.99,
    category: 'Books & Media',
    qty: 25,
    image:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&h=900&fit=crop&auto=format',
  },
];

const categories = ['All', 'Apparel', 'Accessories', 'Books & Media'];

interface LayoutContextType {
  addToCart: (product: Product) => void;
}

export default function Store() {
  const { addToCart } = useOutletContext<LayoutContextType>();
  const [active, setActive] = useState('All');
  const [added, setAdded] = useState<number | null>(null);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: products.length };
    for (const p of products) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, []);

  const visible = active === 'All' ? products : products.filter((p) => p.category === active);

  function handleAdd(product: Product) {
    addToCart(product);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1600);
  }

  return (
    <section className="min-h-screen bg-[#faf7f2]">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 pb-20 pt-8 sm:px-6 md:pb-24 md:pt-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b5a2b]">
            The Ministry Store
          </p>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] text-[#2b2320] md:text-6xl">
            Wear your faith.
            <br />
            <span className="text-[#8b5a2b]">Fund the mission.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#7b6f65] md:text-lg">
            Every piece is designed in-house and made in small batches. Proceeds go
            directly to our outreach programs — food distribution, prison ministry,
            and church planting.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#collection"
              className="rounded-md bg-[#1f1a17] px-7 py-3 text-sm font-semibold text-[#faf7f2] transition-opacity hover:opacity-90"
            >
              Shop the collection
            </a>
            <a
              href="/about"
              className="rounded-md border border-[#d8c3a5] px-7 py-3 text-sm font-semibold text-[#5d4037] transition-colors hover:bg-[#f6efe6]"
            >
              Our mission
            </a>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-[#e6ded4] pt-6">
            <div>
              <div className="font-display text-xl font-bold text-[#2b2320]">100%</div>
              <div className="text-[10px] uppercase tracking-widest text-[#a3968a]">To outreach</div>
            </div>
            <div className="border-x border-[#e6ded4] pl-4">
              <div className="font-display text-xl font-bold text-[#2b2320]">Small</div>
              <div className="text-[10px] uppercase tracking-widest text-[#a3968a]">Batch made</div>
            </div>
            <div className="pl-4">
              <div className="font-display text-xl font-bold text-[#2b2320]">Ships</div>
              <div className="text-[10px] uppercase tracking-widest text-[#a3968a]">Worldwide</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl bg-[#efe9e1]">
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=1200&fit=crop&auto=format"
              alt="Ministry apparel collection"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-4 right-4 rounded-lg border border-[#e6ded4] bg-white p-5 shadow-sm sm:left-8 sm:right-auto sm:w-72">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a3968a]">
              Featured
            </p>
            <p className="mt-1 font-display text-lg font-bold text-[#2b2320]">
              The To-Go Chapel Collection
            </p>
            <p className="mt-1 text-xs text-[#7b6f65]">Autumn 2026 · 6 pieces</p>
          </div>
        </div>
      </div>

      <div id="collection" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-20 pt-12 sm:px-6 md:pt-16">
        <div className="flex flex-col gap-6 border-b border-[#e6ded4] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-[#2b2320] md:text-4xl">
              The collection
            </h2>
            <p className="mt-2 text-sm text-[#7b6f65]">
              {visible.length} {visible.length === 1 ? 'piece' : 'pieces'}
              {active !== 'All' ? ` in ${active}` : ' available now'}
            </p>
          </div>
          <div className="flex gap-1 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const isActive = cat === active;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors"
                  style={{
                    background: isActive ? '#1f1a17' : 'transparent',
                    color: isActive ? '#faf7f2' : '#7b6f65',
                    border: `1px solid ${isActive ? '#1f1a17' : '#e6ded4'}`,
                  }}
                >
                  {cat}
                  <span className="ml-2 opacity-60">{counts[cat]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <article key={product.id} className="group flex flex-col">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-[#efe9e1]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {product.tag && (
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#8b5a2b]">
                    {product.tag}
                  </span>
                )}
                <span className="absolute bottom-4 right-4 rounded-full bg-[#1f1a17]/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                  {product.qty} left
                </span>
              </div>

              <div className="mt-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a3968a]">
                    {product.category}
                  </p>
                  <h3 className="mt-1 font-display text-base font-semibold leading-snug text-[#2b2320] sm:text-lg">
                    {product.name}
                  </h3>
                </div>
                <span className="flex-shrink-0 font-display text-base font-bold text-[#2b2320] sm:text-lg">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => handleAdd(product)}
                className="mt-4 w-full rounded-md border py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors"
                style={
                  added === product.id
                    ? { background: '#f1f8f3', color: '#2f7d4f', borderColor: '#cfe3d6' }
                    : { background: 'transparent', color: '#5d4037', borderColor: '#d8c3a5' }
                }
              >
                {added === product.id ? 'Added to cart' : 'Add to cart'}
              </button>
            </article>
          ))}
        </div>

        <div className="mt-20 grid gap-6 border-t border-[#e6ded4] pt-12 sm:grid-cols-3">
          {[
            {
              title: 'Funds the mission',
              body: 'All proceeds support food distribution, prison ministry, and church planting.',
            },
            {
              title: 'Made with care',
              body: 'Printed and packed in small batches by our own ministry team.',
            },
            {
              title: 'Easy returns',
              body: 'Not the right fit? Return unworn items within 30 days, no questions asked.',
            },
          ].map((item) => (
            <div key={item.title} className="border-t-2 border-[#8b5a2b] pt-5">
              <h3 className="font-display text-lg font-bold text-[#2b2320]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#7b6f65]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}