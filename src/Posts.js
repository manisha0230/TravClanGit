import React, { useState, useEffect } from "react";
import Data from "./data";

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  function details(post) {
    console.log(post);
  }
  function setBidMin(bid) {
    console.log(bid);
    document.getElementById("bid" + bid.id).innerText = bid.minBid;
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
        <tr id={"post" + id} onClick={() => details(post)}>
          <td>
            <div className="avtar">
              <img className="avatarimg" src={post.avatarUrl} />
              <div className="name">{post.firstname + " " + post.lastname}</div>
            </div>
          </td>
          <td>{post.email}</td>
          <td>{post.phone}</td>

          <td>{post.hasPremium ? "Yes" : "No"}</td>
          <td id={"bid" + post.id}>
            <div className="bid">
              <div className="amount">{post.maxBid}</div>
              <button onClick={() => setBidMin(post)}>Min</button>
            </div>
          </td>
        </tr>
      ))}
    </table>
  );
};

export default Posts;
