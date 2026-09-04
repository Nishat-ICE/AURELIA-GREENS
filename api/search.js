export default async function handler(req, res) {
    const query = req.query.q || "";
    const page = req.query.page || "1";

    try {
        const params = new URLSearchParams();

        params.set(
            "key",
            process.env.PERENUAL_API_KEY
        );

        params.set("page", page);

        if (query.trim()) {
            params.set(
                "q",
                query.trim()
            );
        }

        const apiURL =
            "https://www.perenual.com/api/v2/species-list?" +
            params.toString();

        const response = await fetch(apiURL);

        const data = await response.json();

        if (!response.ok) {
            console.error(
                "Perenual Error:",
                data
            );

            return res.status(response.status).json({
                error: "Perenual API request failed.",
                details: data
            });
        }

        return res.status(200).json(data);

    } catch (error) {

        console.error(
            "API Error:",
            error
        );

        return res.status(500).json({
            error: "Unable to fetch plant data."
        });
    }
}