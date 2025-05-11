import { useEffect, useState } from "react"
import { api } from "../api"

const useGet = (endpoint, reload, skip) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    
    useEffect(() => {
        setLoading(true)
        if (!skip) {
            api
                .get(`${endpoint}?limit=1000`)
                .then((res) => setData(res.data))
                .catch((err) => {
                    setError(err.message)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [reload, skip])
    return { data, loading, error }
}

export default useGet