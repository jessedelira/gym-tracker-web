import type { JSX } from 'solid-js';

type InformationLandingCardProps = {
  cardTitle: string;
  cardDescription: string;
  Icon: JSX.Element;
  iconBackgroundStyle: string;
};

export function InformationLandingCard(props: InformationLandingCardProps) {
  return (
    <div class="rounded-3xl bg-white p-8 shadow-sm">
      <div class={props.iconBackgroundStyle}>{props.Icon}</div>
      <h3 class="text-2xl font-medium text-gray-900">{props.cardTitle}</h3>
      <p class="mt-3 text-lg leading-relaxed text-gray-500">
        {props.cardDescription}
      </p>
    </div>
  );
}
