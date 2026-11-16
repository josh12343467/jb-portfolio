import { stack } from "../data";

/** A slow, endless strip of the tools I use. Pauses on hover; stops for reduced motion. */
export default function Ticker() {
  const items = stack.flatMap((row) => row.tools.map((t) => t.name));
  const loop = [...items, ...items];

  return (
    <div className="ticker overflow-hidden border-y border-ink bg-ink py-4 text-paper" aria-label={`Tools I use: ${items.join(", ")}`}>
      <div className="ticker-track flex w-max items-center" aria-hidden="true">
        {loop.map((name, i) => (
          <span key={i} className="flex items-center whitespace-nowrap text-2xl font-semibold tracking-tight sm:text-3xl">
            <span className="px-6">{name}</span>
            <svg viewBox="0 0 24 24" className="size-5 text-accent" fill="currentColor">
              <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
