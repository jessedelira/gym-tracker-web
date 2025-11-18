import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth/use-auth';
import { GitHubLandingIcon } from '../components/icon/landing/github-landing-icon';
import { InformationLandingCard } from '../components/icon/landing/information-landing-card';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import { ChartBarSquareIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    navigate('/home');
  }

  return (
    <main className="landing-page bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center pt-24 pb-12">
          <div className="w-full max-w-md text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-gray-900">
              Gym Tracker
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Your fitness journey, simplified.
            </p>

            <div className="mt-12 space-y-4">
              <Link
                to="/login"
                className="block w-full rounded-2xl bg-blue-600 px-8 py-4 text-center text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block w-full rounded-2xl border-2 border-gray-200 bg-white px-8 py-4 text-center text-base font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mx-auto max-w-3xl space-y-4">
          <InformationLandingCard
            cardTitle={'Track Workouts'}
            cardDescription={
              'Log your exercises with a clean, intuitive interface.'
            }
            Icon={<ClipboardIcon className="size-8 stroke-blue-600" />}
            iconBackgroundStyle={'mb-6 inline-flex rounded-2xl bg-blue-50 p-4'}
          ></InformationLandingCard>

          {/* Monitor Progress */}
          <InformationLandingCard
            cardTitle={'Monitor Progress'}
            cardDescription={'Visualize your improvement over time.'}
            Icon={<ChartBarSquareIcon className="size-8 stroke-green-600" />}
            iconBackgroundStyle={'mb-6 inline-flex rounded-2xl bg-green-50 p-4'}
          ></InformationLandingCard>

          {/* Achieve Goals */}
          <InformationLandingCard
            cardTitle={'Achieve Goals'}
            cardDescription={
              'Set and reach your fitness targets with confidence.'
            }
            Icon={<CheckCircleIcon className="size-8 stroke-purple-600" />}
            iconBackgroundStyle={
              'mb-6 inline-flex rounded-2xl bg-purple-50 p-4'
            }
          ></InformationLandingCard>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-100 py-12">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <a
              href="https://github.com/jessedelira/gym-tracker-web"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-900"
            >
              <CodeBracketIcon className="size-6" />
              <span className="text-sm font-medium">Source Code</span>
            </a>

            <a
              href="https://github.com/jessedelira/gym-tracker-web"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-900"
            >
              <InformationCircleIcon className="size-6" />
              <span className="text-sm font-medium">What is this?</span>
            </a>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            Made in Chicago ❤️
          </p>
        </footer>
      </div>
    </main>
  );
}
