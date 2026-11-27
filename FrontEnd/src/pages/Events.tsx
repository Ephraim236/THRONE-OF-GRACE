import { useMemo, useState } from 'react';

interface ChurchEvent {
  id: number;
  date: string;
  title: string;
  time: string;
  location: string;
  description: string;
  category: string;
  image: string;
}

const events: ChurchEvent[] = [
  {
    id: 1,
    date: '2026-10-18',
    title: 'Sunday Morning Worship',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    description:
      'A full morning of praise, prayer, and the preached Word. Nursery and children’s ministry provided.',
    category: 'Service',
    image:
      'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1200&h=800&fit=crop&auto=format',
  },
  {
    id: 2,
    date: '2026-10-21',
    title: 'Mid-Week Bible Study',
    time: '7:00 PM',
    location: 'Fellowship Hall',
    description:
      'Verse-by-verse study through the Gospel of John. Bring your Bible and a friend — all are welcome.',
    category: 'Study',
    image:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop&auto=format',
  },
  {
    id: 3,
    date: '2026-10-24',
    title: 'Community Outreach Day',
    time: '9:00 AM',
    location: 'City Park',
    description:
      'Food distribution, prayer, and free haircuts for our neighbors. Meet at the chapel at 8:30 AM to carpool.',
    category: 'Outreach',
    image:
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=800&fit=crop&auto=format',
  },
  {
    id: 4,
    date: '2026-10-25',
    title: 'Sunday Evening Worship',
    time: '6:00 PM',
    location: 'Main Sanctuary',
    description:
      'An unhurried evening service with acoustic worship, communion, and a message from Rev. Peter Donkor.',
    category: 'Service',
    image:
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop&auto=format',
  },
  {
    id: 5,
    date: '2026-10-28',
    title: 'Youth Conference 2026',
    time: '2:00 PM',
    location: 'Main Sanctuary',
    description:
      'Two days of worship, workshops, and honest conversation for students in grades 6–12. Dinner included.',
    category: 'Conference',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=800&fit=crop&auto=format',
  },
  {
    id: 6,
    date: '2026-11-01',
    title: 'Prayer & Intercession Night',
    time: '6:30 PM',
    location: 'Upper Room',
    description:
      'A quiet, focused night of prayer for our city, our leaders, and the persecuted church around the world.',
    category: 'Study',
    image:
      'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&h=800&fit=crop&auto=format',
  },
];

const serviceTimes = [
  { day: 'Sunday', time: '8:00 AM & 10:00 AM', label: 'Morning Worship' },
  { day: 'Wednesday', time: '7:00 PM', label: 'Bible Study' },
  { day: 'Friday', time: '6:30 PM', label: 'Prayer & Intercession' },
];

const categories = ['All', 'Service', 'Study', 'Outreach', 'Conference'];

function formatDate(date: string) {
  const d = new Date(date);
  return {
    month: d.toLocaleString('default', { month: 'short' }).toUpperCase(),
    day: d.getDate(),
    weekday: d.toLocaleString('default', { weekday: 'long' }),
    full: d.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' }),
  };
}

export default function Events() {
  const [active, setActive] = useState('All');

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: events.length };
    for (const ev of events) map[ev.category] = (map[ev.category] ?? 0) + 1;
    return map;
  }, []);

  const visible = active === 'All' ? events : events.filter((ev) => ev.category === active);
  const featured = visible[0];
  const rest = visible.slice(1);

  return (
    <section className="min-h-screen bg-[#faf7f2]">
      <div className="relative overflow-hidden bg-[#1f1a17] text-white">
        <img
          src="https://plus.unsplash.com/premium_photo-1775212074572-22e6beccc3d3?auto=format&fit=crop&w=1800&h=1000&q=70"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f1a17] via-[#1f1a17]/90 to-[#1f1a17]/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c9951a]">
            What&apos;s On
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.08] md:text-6xl">
            Gather. Worship.
            <br />
            <span className="text-[#c9951a]">Serve.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#d8cec5] md:text-lg">
            Every gathering at Throne of Grace is an open door. Find your place this
            week — Sunday mornings, mid-week study, or on the streets with us.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/10 pt-8">
            <div>
              <div className="font-display text-2xl font-bold">Sunday</div>
              <div className="text-xs uppercase tracking-widest text-[#b9ada3]">8 & 10 AM</div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <div className="font-display text-2xl font-bold">Wednesday</div>
              <div className="text-xs uppercase tracking-widest text-[#b9ada3]">7 PM Study</div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <div className="font-display text-2xl font-bold">142</div>
              <div className="text-xs uppercase tracking-widest text-[#b9ada3]">Weekly attendees</div>
            </div>
            <a
              href="#calendar"
              className="ml-auto rounded-md bg-[#8b5a2b] px-7 py-3 text-sm font-semibold text-[#faf7f2] transition-opacity hover:opacity-90"
            >
              View calendar
            </a>
          </div>
        </div>
      </div>

      <div id="calendar" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 sm:px-6 md:py-20">
        <div className="flex flex-col gap-6 border-b border-[#e6ded4] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-[#2b2320] md:text-4xl">
              Upcoming gatherings
            </h2>
            <p className="mt-2 text-sm text-[#7b6f65]">
              {visible.length} {visible.length === 1 ? 'event' : 'events'}
              {active !== 'All' ? ` in ${active}` : ' across all categories'}
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

        {featured && (
          <article className="group mt-10 grid overflow-hidden rounded-xl border border-[#e6ded4] bg-white lg:grid-cols-2">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#efe9e1] lg:aspect-auto lg:h-full">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-[#1f1a17]/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#c9951a]">
                Featured
              </span>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-md border border-[#e6ded4] bg-[#faf7f2]">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8b5a2b]">
                    {formatDate(featured.date).month}
                  </span>
                  <span className="font-display text-2xl font-bold leading-none text-[#2b2320]">
                    {formatDate(featured.date).day}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a3968a]">
                    {formatDate(featured.date).weekday} · {featured.category}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-[#2b2320] sm:text-3xl">
                    {featured.title}
                  </h3>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-[#7b6f65] sm:text-base">
                {featured.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#5c5148]">
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-[#a3968a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M12 8v4l3 3M12 21a9 9 0 110-18 9 9 0 010 18z" />
                  </svg>
                  {featured.time}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-[#a3968a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M17.657 16.657L12 22.314l-5.657-5.657a7 7 0 1110.314 0zM12 11a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                  {featured.location}
                </span>
              </div>
              <a
                href="#calendar"
                className="mt-8 inline-flex w-fit items-center gap-2 border-b border-[#8b5a2b] pb-1 text-sm font-semibold text-[#8b5a2b] transition-colors hover:text-[#5d4037]"
              >
                Event details
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </article>
        )}

        {rest.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((ev) => {
              const d = formatDate(ev.date);
              return (
                <article
                  key={ev.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-[#e6ded4] bg-white transition-shadow hover:shadow-sm"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#efe9e1]">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#8b5a2b]">
                      {ev.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[#a3968a]">
                      <span>{d.month}</span>
                      <span className="h-1 w-1 rounded-full bg-[#d8c3a5]" />
                      <span>{d.day}</span>
                      <span className="h-1 w-1 rounded-full bg-[#d8c3a5]" />
                      <span className="truncate">{d.weekday}</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold leading-tight text-[#2b2320]">
                      {ev.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#7b6f65]">
                      {ev.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-[#f0eae2] pt-4 text-xs text-[#5c5148]">
                      <span>{ev.time}</span>
                      <span className="truncate pl-3 text-right text-[#a3968a]">{ev.location}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-16 grid gap-8 border-t border-[#e6ded4] pt-12 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8b5a2b]">
              Weekly rhythm
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#2b2320]">
              Regular service times
            </h2>
            <div className="mt-8 divide-y divide-[#e6ded4] border-y border-[#e6ded4]">
              {serviceTimes.map((s) => (
                <div key={s.day} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-baseline gap-4">
                    <span className="w-24 text-xs font-semibold uppercase tracking-widest text-[#a3968a]">
                      {s.day}
                    </span>
                    <span className="font-display text-lg font-semibold text-[#2b2320]">{s.label}</span>
                  </div>
                  <span className="pl-0 text-sm text-[#8b5a2b] sm:pl-6 sm:text-right">{s.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-[#1f1a17] p-7 text-white">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9951a]">
              First time here?
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold leading-tight">
              We saved you a seat.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#d8cec5]">
              Come as you are. Arrive a few minutes early for coffee in the foyer, and
              let a welcome team member show you around.
            </p>
            <a
              href="/about"
              className="mt-6 inline-block rounded-md bg-[#8b5a2b] px-6 py-3 text-sm font-semibold text-[#faf7f2] transition-opacity hover:opacity-90"
            >
              Plan your visit
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 rounded-xl border border-[#e6ded4] bg-white px-6 py-12 text-center">
          <h3 className="font-display text-2xl font-bold text-[#2b2320]">Never miss a gathering</h3>
          <p className="max-w-md text-sm text-[#7b6f65]">
            Get a weekly email with service times, study notes, and outreach opportunities.
          </p>
          <form
            className="mt-2 flex w-full max-w-md flex-col gap-2 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="flex-1 rounded-md border border-[#e6ded4] bg-[#faf7f2] px-4 py-3 text-sm text-[#2b2320] outline-none transition-colors placeholder:text-[#b0a49a] focus:border-[#8b5a2b]"
            />
            <button
              type="submit"
              className="rounded-md bg-[#1f1a17] px-6 py-3 text-sm font-semibold text-[#faf7f2] transition-opacity hover:opacity-90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}