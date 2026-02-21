import { A } from '@solidjs/router';

type Props = {
  href: string;
  title: string;
  description: string;
};

export function ManagePageLink(props: Props) {
  return (
    <A
      href={props.href}
      class="flex items-center justify-between p-3 hover:bg-gray-50"
    >
      <div class="flex flex-col space-y-0.5">
        <span class="text-base font-medium text-gray-900">{props.title}</span>
        <span class="text-xs text-gray-500">{props.description}</span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </A>
  );
}
