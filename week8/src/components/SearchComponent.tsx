interface SearchProps {
    username: string | null;
}

export default function SearchComponent({ username }: SearchProps) {

    async function handleBuy() {
        const response = await fetch("/buy", {
            method: "POST"
        });

        if (response.status === 401) {
            alert("You are not logged in");
        } else {
            alert("Item purchased");
        }
    }

    return (
        <div>
            <h2>Search Music</h2>

            <button onClick={handleBuy}>
                Buy
            </button>
        </div>
    );
}