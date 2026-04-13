import { useState } from "react";
import ReactCounter from "./games/ReactCounter";
import ReactKuis from "./games/ReactKuis";


function App(){
  const [onPage,setOnPage] = useState({data:null,page:'menu'}); 
  const Games = [
    {title: 'React Counter', subtitle:'Game Mengasah Ketepatan & Kefokusan', page:'react-counter',sampul:'bi bi-plus-circle'},
    {title: 'React Kuis', subtitle:'Game Mengasah Otak & Kecepatan', page:'react-kuis',sampul:'bi bi-card-checklist'},
    {title: 'React Kuis', subtitle:'Game Mengasah Otak & Kecepatan', page:'react-kuis',sampul:'bi bi-controller'},
    {title: 'React Kuis', subtitle:'Game Mengasah Otak & Kecepatan', page:'react-kuis',sampul:'bi bi-controller'},
  ]
  
  const handleSelect = (game) => {
    setOnPage({data:null,page:game});
  }

  // Menu 
  if (onPage.page === 'menu') return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center bg-dark">
        <div className="row justify-content-center text-center gy-3">
          <div className="col-md-12 mb-2 mt-5 d-flex justify-content-center gap-2">
            <img id="react-logo" src='logo_dark.svg' style={{height:"50px"}} alt="" />
            <h1 style={{fontWeight:"bolder"}} className="text-light">React Game</h1>
          </div>
          <div className="col-md-12"><p className="text-light">React Game - Sandbox </p></div>
          <div className="col-md-12 text-light w-75 mb-2"><hr /></div>
          {
            Games.map((game,i) => (
              <div onClick={() => handleSelect(game.page)} className="game-card col-md-4 bg-primary rounded-5 mx-2 align-items-center justify-content-center d-flex shadow-lg" style={{height:"300px",cursor:"pointer"}} key={i}>
                <div className="row align-items-center">
                  <div className="col-md-12 text-dark">
                    <i className={game.sampul} style={{fontSize:"100px"}}></i>
                  </div>
                  <div className="col-md-12">
                    <h2>{game.title}</h2>
                  </div>
                  <div className="col-md-12">
                    <p>{game.subtitle}</p>
                  </div>
                </div>
              </div>
            ))
          }
          <div className="col-md-12"></div>


        </div>
      </div>

    </>
  )


  // React Counter
  if (onPage.page === 'react-counter') return <ReactCounter setOnPage={setOnPage} /> 

  // React Kuis
  if (onPage.page === 'react-kuis') return <ReactKuis setOnPage={setOnPage} />
}


export default App;