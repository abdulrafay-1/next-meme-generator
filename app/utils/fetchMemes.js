const fetchMemes = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch("https://api.imgflip.com/get_memes", {
                next: {
                    revalidate: 60,
                }
            })
            const data = await response.json()
            resolve(data)
        }
        catch {
            (err) => {
                console.log(err)
                reject(err)
            }
        }
    })
}

export default fetchMemes