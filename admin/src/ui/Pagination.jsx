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

    // if (totalPage <= 1) return null

    return (
        <div className="flex items-center justify-between w-full mt-3 dark:text-slate-50">
            <p className="">
                Showing <span className="font-bold">{(currentPage - 1) * PAGE_SIZE + 1}</span> to <span className="font-bold">{isLastPage ? count : currentPage * PAGE_SIZE}</span> of <span className="font-bold">{count}</span> results
            </p>
            <div className="flex items-center gap-1">
                <button
                    disabled={isFirstPage}
                    onClick={prevPage}
                    type="button"
                    className="flex items-center justify-center gap-2 p-1 px-2 transition-colors duration-300 rounded-md cursor-pointer disabled:hover:bg-white dark:disabled:hover:bg-slate-900 dark:disabled:hover:text-slate-50 disabled:hover:text-black disabled:cursor-not-allowed hover:bg-indigo-700 hover:text-slate-50">
                    <HiChevronLeft />
                    Previous
                </button>
                <button
                    disabled={isLastPage}
                    onClick={nextPage}
                    type="button"
                    className="flex items-center justify-center gap-2 p-1 px-2 transition-colors duration-300 rounded-md cursor-pointer disabled:hover:bg-white dark:disabled:hover:bg-slate-900 dark:disabled:hover:text-slate-50 disabled:hover:text-black disabled:cursor-not-allowed hover:bg-indigo-700 hover:text-slate-50">
                    Next
                    <HiChevronRight />
                </button>
            </div>
        </div>
    )
}
