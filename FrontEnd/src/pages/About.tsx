export default function About() {
  const pillars = [
    { title: 'Faith', body: 'Grounded in Scripture and the living Word of God, our faith is the anchor that sustains us through every season.' },
    { title: 'Grace', body: 'Extending unmerited favor and mercy to every person who enters our doors, just as Christ has shown us grace.' },
    { title: 'Outreach', body: 'Taking the Gospel beyond our walls — into neighborhoods, prisons, nursing homes, and the nations.' },
    { title: 'Worship', body: 'Exalting the King of Kings through reverent, Spirit-led praise and heartfelt intercession.' },
  ];

  return (
    <section className="py-24 px-6 relative bg-[#f8f5f0]">
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1775212074572-22e6beccc3d3?auto=format&fit=crop&w=1600&h=900&q=60)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(248,245,234,0.9) 0%, rgba(248,245,234,0.95) 100%)' }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase mb-4" style={{ color: '#8b5a2b' }}>
            Our Story
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#5d4037] mb-6 leading-tight">
            A Church That Comes<br />
            <span style={{ color: '#8b5a2b' }}>To You</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="text-[#5d4037] leading-relaxed mb-5 text-lg">
              Throne of Grace Outreach Ministry was founded on the conviction that the Church is not
              a building — it is a people. Our "To-Go Chapel" model brings authentic worship,
              discipleship, and community care directly where people are: in neighborhoods,
              online, and wherever God sends us.
            </p>
            <p className="text-[#5d4037] leading-relaxed mb-8 text-lg">
              From our Sunday services to our mid-week Bible studies, youth programs,
              and prison ministry, every initiative is designed to reflect the love of Christ
              and advance His Kingdom on earth.
            </p>
            <a href="/events"
              className="inline-block px-8 py-3 rounded-md text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: '#8b5a2b' }}>
              View Our Services
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map(p => (
              <div key={p.title} className="border border-[#d7ccc8] rounded-lg p-6 text-center"
                style={{ background: '#ffffff' }}>
                <h3 className="font-display text-xl font-bold text-[#5d4037] mb-3">{p.title}</h3>
                <p className="text-sm text-[#6d4c41] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
