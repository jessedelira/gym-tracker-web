import { A } from '@solidjs/router';
import { Icon } from 'solid-heroicons';
import {
  clipboard,
  chartBarSquare,
  checkCircle,
  codeBracket,
  informationCircle,
} from 'solid-heroicons/outline';
import { InformationLandingCard } from '../components/landing/information-landing-card';

export function LandingPage() {
  return (
    <main class="landing-page bg-gray-50">
      <div class="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div class="flex flex-col items-center justify-center pt-24 pb-12">
          <div class="w-full max-w-md text-center">
            <h1 class="text-5xl font-semibold tracking-tight text-gray-900">
              Gym Tracker
            </h1>
            <p class="mt-6 text-xl text-gray-600">
              Your fitness journey, simplified.
            </p>

            <div class="mt-12 space-y-4">
              <A
                href="/login"
                class="block w-full rounded-2xl bg-blue-600 px-8 py-4 text-center text-base font-medium text-white shadow-sm transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                Sign In
              </A>
              <A
                href="/register"
                class="block w-full rounded-2xl border-2 border-gray-200 bg-white px-8 py-4 text-center text-base font-medium text-gray-700 shadow-sm transition-colors focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none"
              >
                Create Account
              </A>
            </div>
          </div>
        </div>

        {/* Features */}
        <div class="mx-auto max-w-3xl space-y-4">
          <InformationLandingCard
            cardTitle="Track Workouts"
            cardDescription="Log your exercises with a clean, intuitive interface."
            Icon={<Icon path={clipboard} class="size-8 stroke-blue-600" />}
            iconBackgroundStyle="mb-6 inline-flex rounded-2xl bg-blue-50 p-4"
          />

          <InformationLandingCard
            cardTitle="Monitor Progress"
            cardDescription="Visualize your improvement over time."
            Icon={
              <Icon path={chartBarSquare} class="size-8 stroke-green-600" />
            }
            iconBackgroundStyle="mb-6 inline-flex rounded-2xl bg-green-50 p-4"
          />

          <InformationLandingCard
            cardTitle="Achieve Goals"
            cardDescription="Set and reach your fitness targets with confidence."
            Icon={<Icon path={checkCircle} class="size-8 stroke-purple-600" />}
            iconBackgroundStyle="mb-6 inline-flex rounded-2xl bg-purple-50 p-4"
          />
        </div>

        {/* Footer */}
        <footer class="border-t border-gray-100 py-12">
          <div class="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <a
              href="https://github.com/jessedelira/gym-tracker-web"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-gray-500 transition-colors"
            >
              <Icon path={codeBracket} class="size-6" />
              <span class="text-sm font-medium">Source Code</span>
            </a>

            <a
              href="https://github.com/jessedelira/gym-tracker-web"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-gray-500 transition-colors"
            >
              <Icon path={informationCircle} class="size-6" />
              <span class="text-sm font-medium">What is this?</span>
            </a>
          </div>

          <p class="mt-6 text-center text-xs text-gray-400">
            Made in Chicago ❤️
          </p>
        </footer>
      </div>
    </main>
  );
}
