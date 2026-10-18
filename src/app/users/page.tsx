import { Suspense } from "react";
import Users, { type User } from "../comoponents/Users";

const UsersPage = async () => {
    const usersPromise: Promise<User[]> = fetch("http://localhost:5001/users").then((res) => res.json());

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Users usersPromise={usersPromise} />
        </Suspense>
    );
};

export default UsersPage;
