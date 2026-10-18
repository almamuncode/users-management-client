export interface User {
    id: number;
    name: string;
    email: string;
}

const Users = async ({ usersPromise }: { usersPromise: Promise<User[]> }) => {
    const users = await usersPromise;

    return (
        <section className="w-full flex-1 bg-zinc-50 px-6 py-12 font-sans dark:bg-zinc-950" aria-labelledby="users-heading">
            <div className="mx-auto max-w-5xl">
            <header className="mb-8 flex items-center justify-between gap-4">
                <div>
                    <h1 id="users-heading" className="text-3xl font-semibold tracking-tight">Users</h1>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Your user directory and contact details.</p>
                </div>
                <span className="shrink-0 rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                    {users.length} {users.length === 1 ? 'user' : 'users'}
                </span>
            </header>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                    <li key={user.id} className="min-w-0 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div aria-hidden="true" className="mb-5 flex size-12 items-center justify-center rounded-full bg-indigo-50 text-lg font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                            {user.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()}
                        </div>
                        <h2 className="break-words text-lg font-semibold">{user.name}</h2>
                        <a href={`mailto:${user.email}`} className="mt-1 block break-all text-sm text-zinc-500 underline-offset-4 hover:text-indigo-600 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 dark:text-zinc-400 dark:hover:text-indigo-300">
                            {user.email}
                        </a>
                        <p className="mt-5 border-t border-zinc-100 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                            User ID <span className="ml-2 font-mono text-zinc-700 dark:text-zinc-300">{user.id}</span>
                        </p>
                    </li>
                ))}
            </ul>
            {users.length === 0 && (
                <p className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">No users yet.</p>
            )}
            </div>
        </section>
    );
};

export default Users;
