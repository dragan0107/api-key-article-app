import React from 'react'

export default function Pagination({postsPerPage, totalPosts, setPage}) {

    const pageNums = [];

    for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        pageNums.push(i);
    }

    return (
        <nav>   
            <ul className="pagination justify-content-center">
                {pageNums.map((num, idx) => <li class="page-item">
                <a key={idx} className="page-link" href="#" onClick={()=> setPage(num)}>{num}</a>
                </li>)}
            </ul>
        </nav>
    )
}
