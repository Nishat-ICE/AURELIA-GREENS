export default async function handler(req, res) {

    const query = req.query.q;

    if (!query || query.trim().length < 2) {
        return res.status(400).json({
            error: "Please enter at least 2 characters."
        });
    }

    try {

        const apiURL =
            "https://www.perenual.com/api/v2/species-list" +
            "?key=" +
            encodeURIComponent(
                process.env.PERENUAL_API_KEY
            ) +
            "&q=" +
            encodeURIComponent(
                query.trim()
            ) +
            "&page=1";

        const response =
            await fetch(apiURL);

        const data =
            await response.json();

        if (!response.ok) {

            return res.status(response.status).json({
                error: "Perenual API request failed."
            });

        }

        return res.status(200).json(data);

    } catch (error) {

        console.error("API Error:", error);

        return res.status(500).json({
            error: "Unable to fetch plant data."
        });
    }
}