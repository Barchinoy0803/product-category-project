import { useState } from "react";
import { api } from "../api"
import { toast } from "react-toastify";

const usePatch = () => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)

    const patchData = (endpoint, data) => {
        setLoading(true)
        return api
            .patch(`/${endpoint}`, data)
            .then((res) => {
                if (res.status === 200)
                    toast.success("Successfully updated!")
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return { patchData, loading }
}

export default usePatch