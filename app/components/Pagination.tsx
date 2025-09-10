type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ( {currentPage, onPageChange, totalPages} ) => {

    if (totalPages <= 1) return null;

  return (
    <div className='flex justify-center gap-2 mt-8'>
      {Array.from({length: totalPages}, (_, idx) => (
        <button
          key={idx + 1}
          onClick={() => onPageChange(idx + 1)}
          className={`px-3 py-1 cursor-pointer rounded ${
                currentPage === idx + 1
                //active 
                  ? 'bg-blue-600 text-white'
                //non active
                  : 'bg-gray-700 text-gray-200'
              }`}
        >
          {idx+1}
        </button>
      ))}
    </div>
  )
}

export default Pagination