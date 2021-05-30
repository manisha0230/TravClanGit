import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import Pagination from "./Pagination";
import axios from "axios";
import "./styles.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [click, setClick] = useState(false);
  const [sortPost, sorted] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://intense-tor-76305.herokuapp.com/merchants"
      );
      setPosts(
        res.data.map((v) => ({ ...v, minBid: minBid(v), maxBid: maxBid(v) }))
      );
      setLoading(false);
    };

    fetchPosts();
  }, []);
  console.log(posts);
  function maxBid(bid) {
    if (bid.bids) {
      let max = 0;
      for (let i = 0; i < bid.bids.length; i++) {
        if (bid.bids[i].amount > max) {
          max = bid.bids[i].amount;
        }
      }
      return max;
    }
  }
  function minBid(bid) {
    if (bid.bids) {
      let min = Number.MAX_SAFE_INTEGER;
      for (let i = 0; i < bid.bids.length; i++) {
        if (bid.bids[i].amount < min) {
          min = bid.bids[i].amount;
        }
      }
      return min;
    }
  }
  function showSorted() {
    setClick(true);
    posts.sort((a, b) => b.maxBid - a.maxBid);
    console.log(posts);
    sorted(posts);
  }
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts;
  if (click === true) {
    currentPosts = sortPost.slice(indexOfFirstPost, indexOfLastPost);
  } else {
    currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  }
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <Posts posts={currentPosts} loading={loading} />
      <div className="sort">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
        <button class="sorting" onClick={showSorted}>
          Sort
        </button>
      </div>
    </div>
  );
};

export default App;
