import { Fragment, type CSSProperties } from "react";
import type { RichLine } from "@/content";

/** How many words a line has: the next line's BlurText starts counting from there. */
export const wordCount = (line: RichLine) =>
  line.reduce((count, segment) => count + segment.text.split(/\s+/).filter(Boolean).length, 0);

/**
 * Blur Text, after React Bits' BlurText (its default "blur" effect): one word after another
 * comes into focus, settling from just above. It runs in CSS (data-enter="blur", timings in
 * tokens.css), so the headline starts at first paint without waiting for any script, keeps
 * its accented word and stays real text in the heading. Skipped for reduced motion.
 * `start` continues the stagger from the lines before.
 */
export function BlurText({ line, start = 0 }: { line: RichLine; start?: number }) {
  let index = start;
  const words = (text: string) =>
    text.split(/(\s+)/).map((part, key) =>
      part.trim() === "" ? (
        part
      ) : (
        <span key={key} className="blur-word" data-enter="blur" style={{ "--i": index++ } as CSSProperties}>
          {part}
        </span>
      ),
    );

  return (
    <>
      {line.map((segment, key) =>
        segment.accent ? (
          <em key={key} className="type-accent">
            {words(segment.text)}
          </em>
        ) : (
          <Fragment key={key}>{words(segment.text)}</Fragment>
        ),
      )}
    </>
  );
}
