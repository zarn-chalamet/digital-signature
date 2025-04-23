/* eslint-disable react/prop-types */
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

export default function Pagination({ count }) {
    const [searchParams, setSearchParams] = useSearchParams()

    const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

    const totalPage = Math.ceil(count / PAGE_SIZE)

    const isFirstPage = currentPage === 1
    const isLastPage = currentPage === totalPage

    const prevPage = () => {
        const previous = isFirstPage ? currentPage : currentPage - 1
        searchParams.set('page', previous)
        setSearchParams(searchParams)
    }

    const nextPage = () => {
        const next = isLastPage ? currentPage : currentPage + 1
        searchParams.set('page', next)
        setSearchParams(searchParams)
    }

    if (totalPage <= 1) return null

    return (
        <div className="flex items-center justify-between w-full">
            <p className="">
                Showing <span className="font-bold">{(currentPage - 1) * PAGE_SIZE + 1}</span> to <span className="font-bold">{isLastPage ? count : currentPage * PAGE_SIZE}</span> of <span className="font-bold">{count}</span> results
            </p>
            <div className="flex items-center gap-3">
                <button
                    disabled={isFirstPage}
                    onClick={prevPage}
                    type="button"
                    className="pagination-btn">
                    <HiChevronLeft />
                    Previous
                </button>
                <button
                    disabled={isLastPage}
                    onClick={nextPage}
                    type="button"
                    className="pagination-btn">
                    Next
                    <HiChevronRight />
                </button>
            </div>
        </div>
    )
}
