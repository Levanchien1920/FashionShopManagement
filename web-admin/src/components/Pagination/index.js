import React from 'react'
import PropTypes from 'prop-types'

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func
}

Pagination.defaultProps = {
    onPageChange: null
}

function Pagination(props) {
    const {pagination, onPageChange} = props
    const {page, limit, totalRows, totalPages} = pagination

    // const totalPages = Math.ceil(totalRows / limit)

    function handlePageChange(newPage) {
        if(onPageChange) {
            onPageChange(newPage)
        }
    }

    const pages = [];
    for (let i = 1; i <= totalPages; i++){
        pages.push(i)
    }
    const renderPageNumber = pages.map(number => {
        if (number - 1 == page)
            return (         
            <li class="page-item active" >
                <button class="page-link" key = {number} id = {number} onClick = {() => handlePageChange(number - 1)}>{number}</button>
            </li>
            )
        else  
        return (      
            <li class="page-item" >
                <button class="page-link" key = {number} id = {number} onClick = {() => handlePageChange(number - 1)}>{number}</button>
            </li>
            )        
    })

    return (
        <div>
            <nav aria-label="...">
                <ul class="pagination">
                    <li class="page-item">
                        <button class="page-link" tabindex="-1"
                            disabled={page <= 0} 
                            onClick={() => handlePageChange(page - 1)}
                        >Previous</button>
                    </li>
                    {renderPageNumber}
                    <li class="page-item" >
                        <button class="page-link"  
                            disabled={page >= totalPages - 1} 
                            onClick={() => handlePageChange(page + 1)}
                        >Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Pagination