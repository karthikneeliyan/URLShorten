import { useContext, useEffect, useState } from "react";
import { FaCopy, FaWindowClose } from "react-icons/fa";
import { urlDetailsContext } from "../App";

function isValidURL(str: string) {
  var res = str.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}
export const SearchBox = () => {
  const [url, setURL] = useState("");
  const [shorturl, setShortURL] = useState("");

  const [originalurl, setOriginalurl] = useState("");
  const { setUrls } = useContext(urlDetailsContext);

  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchurl() {
      const urls = await (await fetch("http://localhost:3333/api/all")).json();
      console.log(urls);
      setUrls(urls);
    }
    fetchurl();
  }, []);
  const handleChange = (e: any) => {
    setURL(e.target.value);
  };
  const handleToggle = (e: any) => {
    setShow(!show);
  };
  const handleSubmit = (e: any) => {
    if (!isValidURL(url)) {
        setError(true)
        setTimeout(()=>{ setError(false)},2000)
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origUrl: url }),
    };
    fetch("http://localhost:3333/api/short", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setShortURL(data.shortUrl);
        setOriginalurl(url);
        setURL("");
        setShow(true);
      });
  };
  return (
    <div className="search">
      <h3>Please place the link to short</h3>
      <input className="search_input" onChange={handleChange} value={url} />
      <button onClick={handleSubmit}>Convert</button>
      {error && <div style={{"color":"red"}}>Please provide valid url</div>}
      {show && (
        <div className="sorturldiv">
          <div className="originalUrldiv">
            <p>Original url : {originalurl}</p>
          </div>
          <div className="shorturlinputdiv">
            <a className="shorturlinput" target={"_blank"}  href={originalurl} >{shorturl}</a>
            <span className="copydiv">
              <FaCopy
                onClick={() => {
                  navigator.clipboard.writeText(shorturl);
                  window.alert(shorturl+ " short url copied successfully");
                }}
              />
            </span>
          </div>
          <div className="closediv">
            <FaWindowClose onClick={handleToggle} />
          </div>
        </div>
      )}
    </div>
  );
};
