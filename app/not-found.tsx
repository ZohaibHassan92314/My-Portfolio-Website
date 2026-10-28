import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#070810] text-[#dde4f0]">
      <h1 className="text-4xl font-bold mb-4">404 – Page Not Found</h1>
      <p className="mb-6 text-lg">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="rounded-full bg-[#00d4ff] px-6 py-2 text-sm font-medium text-[#070810] hover:bg-[#00b8e6]"
      >
        Go back home
      </Link>
    </main>
  );
}
