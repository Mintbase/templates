export function LoadingSaleCard(): JSX.Element {
  return (
    <div className="mb-4">
      <div className="py-4 flex justify-center animate-pulse">
        <div className="h-6 w-36 rounded bg-gray-600" />
      </div>
      <div className="p-4 animate-pulse">
        <div className="mb-8 flex flex-col gap-4">
          <div className="h-16 w-full rounded bg-gray-600" />
          <div className="h-16 w-full rounded bg-gray-600" />
        </div>
        <div className="flex justify-center">
          <div className="h-9 w-40 rounded bg-gray-600" />
        </div>
      </div>
    </div>
  );
}
