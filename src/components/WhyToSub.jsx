import React from 'react';
import '../css/WhyToSub.css'

const WhyToSub = () => {
  return (
  <section className="whyToSub">
  <div className=" whyToSubDiv">
    <h3 className="text-center text-primary">POURQUOI S'INSCRIRE?</h3>
    <div className="why  justify-content-center ">
      <div className="reasons bg-secondary ">
        <a href="/Acceuil"><i className="icon-new_releases" /> Nouveaux Projets</a>
        <p>Plus de 100 projets  et 10 nouveautés en moyenne sont ajoutés par mois.</p>
      </div>
      <div className="reasons bg-secondary">
        <a href="/MesFavoris"><i className="icon-favorite" /> Mes Projets Favoris</a>
        <p>Explorez l'ensemble des ressources et créez des dossiers favoris pour classer les contenus qui vous intéressent.</p>
      </div>
      <div className="reasons bg-secondary">
        <h4><i className="icon-question_answer" /> Mes Questions</h4>
        <p>Vous avez des questions? notre équipe de professionnels est en ligne pour vous aider dans vos exercices.</p>
      </div>
    </div>
  </div>
</section>

  )
}

export default WhyToSub
