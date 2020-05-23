function getItemsPerPage(
    items: Array<any>,
    currentPage: number,
    pageSize: number
) {
    return items.slice(
        (currentPage - 1) * pageSize,
        (currentPage - 1) * pageSize + pageSize
    );
}

function getLength(items: Array<any>, itemsPerPage: number) {
    return Math.ceil(items.length / itemsPerPage);
}



export { getItemsPerPage, getLength};
