import { lusitana } from '@/app/ui/fonts';

export default function LoginForm() {
  return (
    <form className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                @
              </span>
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                🔒
              </span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Log in
        </button>
        <div className="flex h-8 items-end space-x-1">
        </div>
      </div>
    </form>
  );
}
