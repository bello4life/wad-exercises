interface Props {
    username: string | null;
}

export default function SearchComponent({ username }: Props) {

    async function handleBuy() {
        const res = await fetch("/buy", {
            method: "POST"
        });

        if (res.status === 401) {
            alert("You are not logged in");
        } else {
            alert("Song purchased");
        }
    }

    return (
        <div>
            <h2>Search</h2>
            <button onClick={handleBuy}>Buy Song</button>
        </div>
    );
}