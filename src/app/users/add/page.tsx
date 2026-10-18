'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddUserPage = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting) return;
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;

        setError('');
        setIsSubmitting(true);
        try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });

        if (!response.ok) {
            const result = await response.json();
            setError(result.error || 'Failed to add user. Please try again.');
            return;
        }
        router.push('/users');
        router.refresh();
        } catch {
            setError('Could not connect. Check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex-1 bg-zinc-50 px-6 py-12 font-sans dark:bg-zinc-950 sm:py-16">
            <div className="mx-auto max-w-lg">
                <Link href="/users" className="inline-flex items-center gap-2 rounded text-sm font-medium text-zinc-500 transition-colors hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 dark:text-zinc-400 dark:hover:text-indigo-300">
                    <span aria-hidden="true">←</span> Back to users
                </Link>
                <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
                    <header className="mb-8">
                        <div aria-hidden="true" className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="8" r="3" />
                                <path d="M3 21v-2a6 6 0 0 1 12 0v2M19 8v6M16 11h6" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Add a user</h1>
                        <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">Enter their details to add them to your directory.</p>
                    </header>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">{error}</p>}
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Full name</label>
                    <input type="text" id="name" name="name" autoComplete="name" placeholder="e.g. Alex Morgan" required className="block w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Email address</label>
                    <input type="email" id="email" name="email" autoComplete="email" placeholder="alex@example.com" required className="block w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" />
                </div>
                <div className="flex flex-col-reverse gap-3 border-t border-zinc-100 pt-6 dark:border-zinc-800 sm:flex-row sm:justify-end">
                    <Link href="/users" className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">Cancel</Link>
                    <button type="submit" disabled={isSubmitting} className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 disabled:cursor-wait disabled:opacity-60">{isSubmitting ? 'Adding user…' : 'Add user'}</button>
                </div>
            </form>
                </div>
            </div>
        </main>
    );
};

export default AddUserPage;
