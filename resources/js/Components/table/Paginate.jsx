import ReactPaginate from "react-paginate";

export function Paginate({ pageCount, currentPage, handlePageClick }) {
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            initialPage={currentPage}
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
            containerClassName="flex items-center flex-wrap gap-2.5 [&>li]:list-none text-sm w-fit"
            pageLinkClassName="block h-7 sm:h-8 min-w-8 px-3 border flex items-center justify-center rounded-lg hover:no-underline text-body-text hover:bg-muted/20"
            previousClassName="group"
            previousLinkClassName="block h-7 sm:h-8 min-w-8 px-3 border flex items-center justify-center rounded-lg hover:no-underline text-body-text hover:bg-muted/10 group-[.disabled]:opacity-50 group-[.disabled]:cursor-not-allowed"
            nextClassName="group"
            nextLinkClassName="block h-7 sm:h-8 min-w-8 px-3 border flex items-center justify-center rounded-lg hover:no-underline text-body-text hover:bg-muted/10 group-[.disabled]:opacity-50 group-[.disabled]:cursor-not-allowed"
            activeClassName="group"
            activeLinkClassName="bg-primary text-primary-foreground group-hover:bg-primary hover:text-primary-foreground"
            breakLinkClassName="block h-8 min-w-8 px-3 border flex items-center justify-center rounded-lg hover:no-underline text-muted"
        />
    );
}
