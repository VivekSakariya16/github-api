import React, {useState} from 'react'
import axios from 'axios'
import './DisplayRepos.css'

const DisplayRepos = () => {
    const host = "http://localhost:8080";
    const [repos, setRepos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [reposPerPage, setReposPerPage] = useState(10);

    React.useEffect(() => {
        fetchRepositories();
    },[currentPage, reposPerPage]);

    const fetchRepositories = async () => {
        const response = await axios.get(host+"/get-all-repos");
        setRepos(response.data);
        console.log(response.data);
    }

    const handleChange = (e) => {
        setCurrentPage(1);
        setReposPerPage(e.target.value);
    }

    const indexOfLastRepo = currentPage * reposPerPage;
    const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
    const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

    return (
        <div>
            <div className="dropdown-container">
                <select className="dropdown-select" onChange={handleChange}>
                    <option value="10" defaultChecked>10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div className="repo-container">
                {currentRepos.map((repo) => (
                <div key={repo.id} className="repo-box">
                    <h1 className="repo-title">{repo.name}</h1>
                    <p className="repo-description">{repo.description}</p>
                    <p className="repo-stars">Stars: {repo.stargazers_count}</p>
                </div>
                ))}
            </div>
        
            <div className="pagination">
                {Array.from({ length: Math.ceil(repos.length / reposPerPage) }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => {setCurrentPage(index + 1); window.scrollTo({ top: 0, behavior: 'smooth' });}}
                    className={index + 1 === currentPage ? "current-page" : "other-page"}>
                    {index + 1}
                </button>
                ))}
            </div>
        </div>
    );
};
    
export default DisplayRepos;