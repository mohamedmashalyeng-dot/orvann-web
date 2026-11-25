/**
 * The golden spiral of ORVANN's graphic language ("proportion & focus"): the Fibonacci
 * squares of a 1.618 rectangle with the spiral drawn through them. Decorative.
 */
export function GoldenSpiral({ className, grid = true }: { className?: string; grid?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 1618 1000" fill="none" aria-hidden="true" focusable="false">
      {grid && (
        <path
          d="M1 1h1616v998H1zM1000 0v1000M1000 618h618M1236 618v382M1000 764h236M1146 618v146M1146 708h90M1180 708v56M1146 730h34"
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          opacity="0.5"
        />
      )}
      <path
        d="M0 1000A1000 1000 0 0 1 1000 0A618 618 0 0 1 1618 618A382 382 0 0 1 1236 1000A236 236 0 0 1 1000 764A146 146 0 0 1 1146 618A90 90 0 0 1 1236 708A56 56 0 0 1 1180 764A34 34 0 0 1 1146 730"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
