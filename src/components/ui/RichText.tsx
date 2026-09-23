import type { RichLine } from "@/content";

/** Renders a line of copy, setting accented segments in the brand serif italic. */
export function RichText({ line }: { line: RichLine }) {
  return (
    <>
      {line.map((segment, index) =>
        segment.accent ? (
          <em key={index} className="type-accent">
            {segment.text}
          </em>
        ) : (
          segment.text
        ),
      )}
    </>
  );
}
