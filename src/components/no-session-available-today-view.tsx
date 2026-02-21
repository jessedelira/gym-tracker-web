interface NoSessionsAvailableTodayViewProps {
  routineName: string;
}

export function NoSessionAvailableTodayView(
  props: NoSessionsAvailableTodayViewProps,
) {
  return (
    <div class="flex flex-col items-center justify-center p-4 text-center">
      <img
        src="/gifs/bunnyRunner.gif"
        alt="Animated running rabbit"
        width={200}
        height={200}
        class="mb-4"
      />
      <p class="text-base text-gray-600">
        Your active routine,{' '}
        <span class="font-medium">{props.routineName}</span>, has no sessions
        for today!
      </p>
    </div>
  );
}
