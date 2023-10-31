
export default function WelcomeBar({ createPopup, user, logout }) {
    return (
        <div>
            {
                user
                    ?
                    <>
                        <h1>Hello, {user.displayName}</h1>
                        <button onClick={logout}>Logout</button>
                    </>
                    :
                    <button onClick={createPopup}>Log In With Google</button>}
        </div>
    )
}
