import React, { useState, useEffect } from "react";
import Data from "./data";

const Posts = ({ posts, loading }) => {
  const [bid, setBid] = useState([]);
  if (loading) {
    return <h2>Loading...</h2>;
  }
  function calculate(bids) {
    if (bids) {
      let max = 0;
      for (let i = 0; i < bids.length; i++) {
        if (bids[i].amount > max) {
          max = bids[i].amount;
        }
      }
      return max;
    }
  }
  function handleClick(data) {
    console.log("hi");
  }
  return (
    <table id="customers">
      <tr>
        <th>Customer Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Premium</th>
        <th id="bid">Bid (Max/Min)</th>
      </tr>
      {posts.map((post, id) => (
        <tr id={"post" + id} onclick={handleClick(post)}>
          <td>
            <div className="avtar">
              <img className="avatarimg" src={post.avatarUrl} />
              <div className="name">{post.firstname + " " + post.lastname}</div>
            </div>
          </td>
          <td>{post.email}</td>
          <td>{post.phone}</td>

          <td>{post.hasPremium ? "Yes" : "No"}</td>
          <td id={"bid" + id}>
            <div className="bid">
              <div className="amount">
                {calculate(post.bids ? post.bids : null)}
              </div>
              <label class="switch">
                <input type="checkbox" checked />
                <span class="slider round"></span>
              </label>
            </div>
          </td>
        </tr>
      ))}
    </table>
  );
};

export default Posts;
