import React from 'react';
import LatestProjets from './LatestProjets';
import Projets from './Projets';

const Acceuil = () => {
  return (
    <>
        <section className="latest-projets">
            <LatestProjets/>
        </section>
        <section className="all-projets">
            <Projets/>
        </section>
    </>
  )
}

export default Acceuil
