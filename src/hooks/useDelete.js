import { toast } from "react-toastify"
import { api } from "../api"
import { useState } from "react"

const useDelete = () => {
    const [loading, setLoading] = useState(false)

    const deleteData = (endpoint) => {
        setLoading(true)
        return api
            .delete(endpoint)
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Successfully deleted!")
                }
            })
            .catch((res) => {
                if (res.status === 409) {
                    toast.warn("You can't delete it, beacuse it has products!")
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return { deleteData, loading }
}

export default useDelete;