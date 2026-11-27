import { useEffect, useMemo, useState } from 'react';

interface Nominee {
  id: number;
  name: string;
  role: string;
  photo: string;
  votes: number;
}

interface Category {
  id: number;
  name: string;
  tagline: string;
  closes: string;
  nominees: Nominee[];
}

const VOTING_CLOSES = '2026-11-30T23:59:59';

const initialCategories: Category[] = [
  {
    id: 1,
    name: 'Best Worship Leader',
    tagline: 'Recognizing excellence in leading congregational worship.',
    closes: 'Nov 30, 2026',
    nominees: [
      { id: 1, name: 'Sarah Johnson', role: 'Lead Vocalist', photo: 'https://i.pravatar.cc/400?img=5', votes: 87 },
      { id: 2, name: 'Michael Torres', role: 'Worship Team', photo: 'https://i.pravatar.cc/400?img=12', votes: 64 },
      { id: 3, name: 'Grace Lee', role: 'Praise & Worship', photo: 'https://i.pravatar.cc/400?img=32', votes: 52 },
      { id: 4, name: 'David Kim', role: 'Worship Director', photo: 'https://i.pravatar.cc/400?img=47', votes: 43 },
      { id: 5, name: 'Ruth Adeyemi', role: 'Keyboardist', photo: 'https://i.pravatar.cc/400?img=49', votes: 38 },
    ],
  },
  {
    id: 2,
    name: 'Best Community Impact',
    tagline: 'Honoring members who serve our community with dedication.',
    closes: 'Dec 2, 2026',
    nominees: [
      { id: 6, name: 'Pastor Mark Williams', role: 'Outreach Director', photo: 'https://i.pravatar.cc/400?img=60', votes: 98 },
      { id: 7, name: 'Lisa Chen', role: 'Food Pantry Lead', photo: 'https://i.pravatar.cc/400?img=68', votes: 76 },
      { id: 8, name: 'Robert Davis', role: 'Prison Ministry', photo: 'https://i.pravatar.cc/400?img=44', votes: 55 },
      { id: 9, name: 'Maria Santos', role: 'Senior Outreach', photo: 'https://i.pravatar.cc/400?img=33', votes: 41 },
      { id: 10, name: 'Samuel Osei', role: 'Youth Mentorship', photo: 'https://i.pravatar.cc/400?img=59', votes: 34 },
    ],
  },
  {
    id: 3,
    name: 'Best Youth Leader',
    tagline: "Celebrating leadership in our young people's ministry.",
    closes: 'Nov 28, 2026',
    nominees: [
      { id: 11, name: 'Alex Thompson', role: 'Youth Pastor', photo: 'https://i.pravatar.cc/400?img=25', votes: 73 },
      { id: 12, name: 'Emma Rodriguez', role: 'Young Adults', photo: 'https://i.pravatar.cc/400?img=51', votes: 58 },
      { id: 13, name: 'James Wilson', role: 'Student Ministry', photo: 'https://i.pravatar.cc/400?img=13', votes: 45 },
      { id: 14, name: 'Nadia Bello', role: 'Worship & Dance', photo: 'https://i.pravatar.cc/400?img=36', votes: 29 },
    ],
  },
];

function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = Math.max(0, new Date(target).getTime() - now);

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-3 text-center">
      <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-widest text-[#b9ada3]">{label}</div>
    </div>
  );
}

function Leaderboard({ category, votedId }: { category: Category; votedId?: number }) {
  const total = category.nominees.reduce((sum, n) => sum + n.votes, 0);
  const ranked = [...category.nominees].sort((a, b) => b.votes - a.votes).slice(0, 5);

  return (
    <div className="rounded-lg border border-[#e6ded4] bg-white">
      <div className="flex items-center justify-between border-b border-[#f0eae2] px-5 py-4">
        <h4 className="font-display text-base font-bold text-[#2b2320]">Live standings</h4>
        <span className="text-[11px] uppercase tracking-wider text-[#a3968a]">{category.name}</span>
      </div>
      <ol className="divide-y divide-[#f6f1ea]">
        {ranked.map((n, i) => {
          const pct = total > 0 ? Math.round((n.votes / total) * 100) : 0;
          return (
            <li key={n.id} className="px-5 py-3">
              <div className="flex items-center gap-3">
                <span
                  className="w-6 text-center font-display text-sm font-bold"
                  style={{ color: i === 0 ? '#8b5a2b' : '#b0a49a' }}
                >
                  {i + 1}
                </span>
                <img src={n.photo} alt="" className="h-8 w-8 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#2b2320]">
                    {n.name}
                    {votedId === n.id && (
                      <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider text-[#2f7d4f]">
                        Your pick
                      </span>
                    )}
                  </p>
                  <p className="text-[11px] text-[#a3968a]">{n.votes} votes</p>
                </div>
                <span className="text-xs font-semibold text-[#8b5a2b]">{pct}%</span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#f0eae2]">
                <div className="h-full rounded-full bg-[#8b5a2b]" style={{ width: `${pct}%` }} />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function Vote() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [activeId, setActiveId] = useState(1);
  const [votes, setVotes] = useState<Record<number, number>>({});
  const [pending, setPending] = useState<Nominee | null>(null);
  const [query, setQuery] = useState('');

  const countdown = useCountdown(VOTING_CLOSES);

  const active = categories.find((c) => c.id === activeId) ?? categories[0];
  const votedId = votes[active.id];

  const totalVotes = categories.reduce(
    (sum, c) => sum + c.nominees.reduce((s, n) => s + n.votes, 0),
    0,
  );
  const nomineeCount = categories.reduce((sum, c) => sum + c.nominees.length, 0);
  const votedCount = Object.keys(votes).length;

  const visibleNominees = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return active.nominees;
    return active.nominees.filter(
      (n) => n.name.toLowerCase().includes(q) || n.role.toLowerCase().includes(q),
    );
  }, [active, query]);

  const topVote = Math.max(...active.nominees.map((n) => n.votes));

  function castVote() {
    if (!pending) return;
    const categoryId = active.id;
    const nomineeId = pending.id;

    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? {
              ...c,
              nominees: c.nominees.map((n) =>
                n.id === nomineeId ? { ...n, votes: n.votes + 1 } : n,
              ),
            }
          : c,
      ),
    );
    setVotes((prev) => ({ ...prev, [categoryId]: nomineeId }));
    setPending(null);
  }

  const votedNominee = votedId
    ? active.nominees.find((n) => n.id === votedId)
    : undefined;

  return (
    <section className="min-h-screen bg-[#faf7f2]">
      <div className="bg-[#1f1a17] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#c9951a]">
              Throne of Grace · Community Awards
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Members&apos; Choice
              <br />
              <span className="text-[#c9951a]">Awards 2026</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#d8cec5] md:text-lg">
              Nominations are in. Review the nominees in each category and cast one
              vote per category to decide who is honored at this year&apos;s
              celebration service.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#categories"
                className="rounded-md bg-[#8b5a2b] px-7 py-3 text-sm font-semibold text-[#faf7f2] transition-opacity hover:opacity-90"
              >
                Browse nominees
              </a>
              <a
                href="#standings"
                className="rounded-md border border-white/25 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                View standings
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#b9ada3]">
                Voting closes in
              </span>
              <span className="rounded-full bg-[#c9951a]/15 px-3 py-1 text-[11px] font-semibold text-[#c9951a]">
                Nov 30, 2026 · 11:59 PM
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <CountdownUnit value={countdown.days} label="Days" />
              <CountdownUnit value={countdown.hours} label="Hours" />
              <CountdownUnit value={countdown.minutes} label="Mins" />
              <CountdownUnit value={countdown.seconds} label="Secs" />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center">
              <div>
                <div className="font-display text-xl font-bold">{categories.length}</div>
                <div className="text-[10px] uppercase tracking-widest text-[#b9ada3]">Categories</div>
              </div>
              <div className="border-x border-white/10">
                <div className="font-display text-xl font-bold">{nomineeCount}</div>
                <div className="text-[10px] uppercase tracking-widest text-[#b9ada3]">Nominees</div>
              </div>
              <div>
                <div className="font-display text-xl font-bold">{totalVotes.toLocaleString()}</div>
                <div className="text-[10px] uppercase tracking-widest text-[#b9ada3]">Votes cast</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="categories"
        className="mx-auto grid max-w-7xl scroll-mt-24 gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[290px_1fr]"
      >
        <aside className="space-y-6">
          <div className="rounded-lg border border-[#e6ded4] bg-white">
            <div className="border-b border-[#f0eae2] px-5 py-4">
              <h3 className="font-display text-base font-bold text-[#2b2320]">Categories</h3>
              <p className="mt-1 text-xs text-[#a3968a]">One vote per category</p>
            </div>
            <div className="flex gap-2 overflow-x-auto p-3 lg:flex-col lg:overflow-visible">
              {categories.map((c) => {
                const isActive = c.id === active.id;
                const hasVoted = votes[c.id] !== undefined;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveId(c.id);
                      setQuery('');
                    }}
                    className="flex min-w-[210px] items-center justify-between gap-3 rounded-md px-4 py-3 text-left transition-colors lg:min-w-0"
                    style={{
                      background: isActive ? '#f6efe6' : 'transparent',
                      border: `1px solid ${isActive ? '#d8c3a5' : 'transparent'}`,
                    }}
                  >
                    <span className="min-w-0">
                      <span
                        className="block truncate text-sm font-semibold"
                        style={{ color: isActive ? '#8b5a2b' : '#2b2320' }}
                      >
                        {c.name}
                      </span>
                      <span className="text-[11px] text-[#a3968a]">
                        {c.nominees.length} nominees
                      </span>
                    </span>
                    {hasVoted && (
                      <svg className="h-4 w-4 flex-shrink-0 text-[#2f7d4f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block">
            <Leaderboard category={active} votedId={votedId} />
          </div>

          <div className="rounded-lg border border-[#e6ded4] bg-white p-5">
            <h4 className="font-display text-sm font-bold text-[#2b2320]">How voting works</h4>
            <ol className="mt-3 space-y-2.5 text-xs leading-relaxed text-[#7b6f65]">
              <li>1. Choose a category and review its nominees.</li>
              <li>2. Tap Vote on your preferred nominee.</li>
              <li>3. Confirm once — one vote per category, per member.</li>
              <li>4. Winners are announced at the celebration service.</li>
            </ol>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-col gap-4 border-b border-[#e6ded4] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b5a2b]">
                Now voting
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-[#2b2320] sm:text-4xl">
                {active.name}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[#7b6f65]">{active.tagline}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a3968a]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search nominees"
                  className="w-full rounded-md border border-[#e6ded4] bg-white py-2.5 pl-9 pr-3 text-sm text-[#2b2320] outline-none transition-colors placeholder:text-[#b0a49a] focus:border-[#8b5a2b] sm:w-56"
                />
              </div>
            </div>
          </div>

          {votedNominee && (
            <div className="mb-6 flex items-center gap-3 rounded-md border border-[#cfe3d6] bg-[#f1f8f3] px-4 py-3 text-sm text-[#2f6b47]">
              <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>
                Your vote in <strong>{active.name}</strong> is counted for{' '}
                <strong>{votedNominee.name}</strong>.
              </span>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visibleNominees.map((n) => {
              const isVoted = votedId === n.id;
              const isLeading = n.votes === topVote;
              return (
                <article
                  key={n.id}
                  className="group flex flex-col overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-md"
                  style={{ borderColor: isVoted ? '#8b5a2b' : '#e6ded4' }}
                >
                  <div className="relative overflow-hidden bg-[#efe9e1]">
                    <img
                      src={n.photo}
                      alt={n.name}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    {isLeading && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#1f1a17]/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#c9951a]">
                        Leading
                      </span>
                    )}
                    {isVoted && (
                      <span className="absolute right-3 top-3 rounded-full bg-[#2f7d4f] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                        Your vote
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#b0a49a]">
                      Nominee #{String(n.id).padStart(3, '0')}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold text-[#2b2320]">{n.name}</h3>
                    <p className="text-sm text-[#8a7f75]">{n.role}</p>

                    <div className="mt-auto pt-4">
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="text-[#a3968a]">{n.votes} votes</span>
                        {votedId !== undefined && (
                          <span className="font-semibold text-[#8b5a2b]">
                            {Math.round(
                              (n.votes /
                                active.nominees.reduce((s, x) => s + x.votes, 0)) *
                                100,
                            )}
                            %
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setPending(n)}
                        disabled={votedId !== undefined}
                        className="w-full rounded-md px-4 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed"
                        style={
                          isVoted
                            ? { background: '#f1f8f3', color: '#2f7d4f', border: '1px solid #cfe3d6' }
                            : votedId !== undefined
                              ? { background: '#f5f1eb', color: '#b0a49a', border: '1px solid #e6ded4' }
                              : { background: '#8b5a2b', color: '#faf7f2' }
                        }
                      >
                        {isVoted ? 'Voted' : votedId !== undefined ? 'Voting closed for you' : 'Vote'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {visibleNominees.length === 0 && (
            <div className="rounded-lg border border-dashed border-[#e6ded4] bg-white px-6 py-16 text-center">
              <p className="text-sm text-[#7b6f65]">
                No nominees match &ldquo;{query}&rdquo; in {active.name}.
              </p>
            </div>
          )}

          <div id="standings" className="mt-12 scroll-mt-24 lg:hidden">
            <Leaderboard category={active} votedId={votedId} />
          </div>

          <div className="mt-12 rounded-lg border border-[#e6ded4] bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-[#2b2320]">
                  Questions about voting?
                </h3>
                <p className="mt-1 text-sm text-[#7b6f65]">
                  Contact the elections team at elections@throneofgrace.org
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-md bg-[#f6efe6] px-4 py-2.5 text-sm font-semibold text-[#8b5a2b]">
                You have voted in {votedCount} of {categories.length} categories
              </span>
            </div>
          </div>
        </div>
      </div>

      {pending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setPending(null)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-md rounded-xl border border-[#e6ded4] bg-white p-6 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b5a2b]">
              Confirm your vote
            </p>
            <div className="mt-4 flex items-center gap-4">
              <img
                src={pending.photo}
                alt={pending.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-display text-xl font-bold text-[#2b2320]">{pending.name}</h3>
                <p className="text-sm text-[#8a7f75]">{pending.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#7b6f65]">
              You are voting for <strong className="text-[#2b2320]">{pending.name}</strong> in the{' '}
              <strong className="text-[#2b2320]">{active.name}</strong> category. Each member may
              cast one vote per category, and votes cannot be changed once submitted.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setPending(null)}
                className="flex-1 rounded-md border border-[#e6ded4] px-4 py-2.5 text-sm font-semibold text-[#5c5148] transition-colors hover:bg-[#faf7f2]"
              >
                Cancel
              </button>
              <button
                onClick={castVote}
                className="flex-1 rounded-md bg-[#8b5a2b] px-4 py-2.5 text-sm font-semibold text-[#faf7f2] transition-opacity hover:opacity-90"
              >
                Confirm vote
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}