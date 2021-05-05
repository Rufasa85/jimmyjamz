import { useEffect,useState } from "react";

function App() {
  const [links,setLinks] = useState([])
  useEffect(() => {
      fetch("/api/getAllLinks").then(res=>res.json()).then(data=>{
        console.log(data);
        setLinks(data.data.allLinks.data)
      })
    },[])
    return (
      <div>
        {links.map(link=><a href={link.url}>{link.name}</a>)}
      </div>
    )
}

export default App;
