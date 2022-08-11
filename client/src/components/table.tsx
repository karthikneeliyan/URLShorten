import React from "react";
import { useContext } from "react";
import { urlDetailsContext } from "../App";

export const ReactTable = () => {
    const { urls: data, setUrls } = useContext(urlDetailsContext);
  
    const handleClick = (e: any, urlid: any) => {
      const url = e.target.href;
  
      fetch(`http://localhost:3333/api/url/${urlid}`)
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          const newData = data.map((url: any) => {
            if (url.urlId === urlid) {
              return res;
            }
            return url;
          });
          setUrls(newData);
        });
    };
    const linkCell = (link: any, shorturl: any, urlid: string) => {
      return (
        <a
          target="_blank"
          onClick={(e) => handleClick(e, urlid)}
          rel="noopener noreferrer"
          href={link}
        >
          {shorturl}
        </a>
      );
    };
    return (
      <div className="tbl">
        <table className="urltable">
          <thead>
            <tr>
              <th>shortUrl</th>
              <th>clicks</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val: any) => {
              return (
                <tr key={val._id}>
                  <td key={val.urlId}>
                    {linkCell(val.origUrl, val.shortUrl, val.urlId)}
                  </td>
                  <td key={val._id}>{val.clicks}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  export const Table = React.memo(ReactTable);