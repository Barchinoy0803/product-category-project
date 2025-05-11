export const getCategoriesDialogTitle = (type) => {
    switch (type) {
        case "add":
            return "Add new category"
        case "edit":
            return "Edit category"
        case "delete":
            return "Delete category"
    }
}

export const getCategoriesDialogButtonTitle = (type) => {
    switch (type) {
        case "add":
            return "Add"
        case "edit":
            return "Update"
        case "delete":
            return "Delete"
    }
}
