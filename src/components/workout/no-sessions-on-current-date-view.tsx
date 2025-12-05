interface NoSessionsOnCurrentDateViewProps {
  routineName: string;
}

export function NoSessionsOnCurrentDateView({
  routineName,
}: NoSessionsOnCurrentDateViewProps) {
  return (
    <div className="mt-60 flex flex-col items-center justify-center p-4 text-center">
      <img
        src="/gifs/bunnyRunner.gif"
        alt="Animated running rabbit"
        width={200}
        height={200}
        className="mb-4"
      />
      <p className="text-base text-gray-600">
        Your active routine, <span className="font-medium">{routineName}</span>,
        has no sessions for today!
      </p>
    </div>
  );
}
