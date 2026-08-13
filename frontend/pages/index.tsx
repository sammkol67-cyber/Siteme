import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg p-4 text-gray-200">
      <header className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold">پلتفرم مانگا / مانوا</h1>
          <nav className="space-x-4">
            <Link href="/auth/login"><a className="text-sm text-muted">ورود</a></Link>
            <Link href="/auth/register"><a className="text-sm text-muted">ثبت نام</a></Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto mt-8">
        <section className="rounded-lg bg-bg-card p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-2">خوش آمدید</h2>
          <p className="text-muted">این یک نسخه اسکِلفولد از پلتفرم مانگا است. وارد شوید یا ثبت نام کنید.</p>
        </section>
      </main>
    </div>
  );
}
