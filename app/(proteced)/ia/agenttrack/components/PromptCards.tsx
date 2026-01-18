'use client';

type Props = {
    suggestions: string[];
    onPick: (text: string) => void;
};

export default function PromptCards({ suggestions, onPick }: Props) {
    return (
        <div className="flex w-full mb-6 gap-3 text-sm text-neutral-800">
            {suggestions.map((s, idx) => (
                <button
                    key={`${idx}-${s.slice(0, 12)}`}
                    type="button"
                    onClick={() => onPick(s)}
                    className="group relative grow text-left border border-[#ccc] shadow-sm hover:shadow-md hover:-translate-y-[1px] hover:bg-neutral-100/30 rounded-xl p-4 transition-all duration-300"
                >
                    {s}
                    <svg
                        className="absolute right-2 bottom-2 h-4 text-neutral-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M2 8a.75.75 0 0 1 .75-.75h8.787L8.25 4.309a.75.75 0 0 1 1-1.118L14 7.441a.75.75 0 0 1 0 1.118l-4.75 4.25a.75.75 0 1 1-1-1.118l3.287-2.941H2.75A.75.75 0 0 1 2 8z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            ))}
        </div>
    );
}
