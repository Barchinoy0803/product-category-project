export const getProductsDialogTitle = (type) => {
    switch (type) {
        case "add":
            return "Add new product"
        case "edit":
            return "Edit product"
        case "delete":
            return "Delete product"
    }
}

export const getProductsDialogButtonTitle = (type) => {
    switch (type) {
        case "add":
            return "Add"
        case "edit":
            return "Update"
        case "delete":
            return "Delete"
    }
}
