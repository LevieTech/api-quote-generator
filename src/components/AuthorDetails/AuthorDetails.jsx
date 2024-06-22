import { useSelector } from 'react-redux';



function AuthorDetails() {
    const authorDetails = useSelector(store => store.authorDetails);

    console.log('Author Details check', authorDetails);


    return (
        <div className="authorDetailsDiv">
            {
                authorDetails.results.map(author => {
                    return (
                        <div className='modalDiv'>
                            <h1>{author.name}</h1>
                            <p>{author.bio}</p>
                        </div>


                    )
                })
            }
        </div>
    )
}

export default AuthorDetails;