"use client"

import { useState, useEffect } from "react"
import { useCookies } from 'next-client-cookies';

export function BingoSheet() {
 const cookies = useCookies();
  const [toggledItems, setToggledItems] = useState(new Set())
  const [loaded, setLoaded] = useState(false)
  const toggleItem = (index: number) => {
    const newToggledItems = new Set(toggledItems)

    if (newToggledItems.has(index)) {
      newToggledItems.delete(index)
    } else {
      newToggledItems.add(index)
    }
    setToggledItems(newToggledItems)
    cookies.set("toggledItems", JSON.stringify(Array.from(newToggledItems)))
  }

  // component on mount look into localstorage and cookies and see if there is a state of checked indexes to
  useEffect(() => {
    setLoaded(false)

    const storedToggledItems = cookies.get("toggledItems")
    if (storedToggledItems) {
      setToggledItems(new Set(JSON.parse(storedToggledItems)))
    }
    setLoaded(true)
  }
  ,[])
  return (
    <div className="bg-background text-card-foreground rounded-lg shadow-lg p-6 w-full border-black">
      <h2 className="text-2xl font-bold mb-4">Bingo Habitus</h2>

      <p>En circulant dans notre magnifique cour estivale, trouve quelqu’un qui…</p>
      <div className="overflow-scroll w-full">
        <div className="grid grid-cols-4 m-2 border min-w-[600px]">
          {[
            "Joue d’un instrument de musique",
            "Habite ici depuis juin 2017",
            "Est né au mois de mars",
            "Possède un autre animal qu’un chat ou un chien",
            "A déjà publié un livre",
            "A de fortes allergies au point de posséder un auto-éjecteur d’adrénaline (EpiPen)",
            "Est impliqué dans un comité Habitus (social, déneigement, jardin, etc.)",
            "A 3 enfants ou plus",
            "Porte du jaune aujourd’hui",
            "N’aime pas les sushis",
            "N’est pas propriétaire d’une voiture",
            "S’est déjà fait voler plus de 1000$ depuis qu’il.elle habite ici.",
            "Est le.la président.e du CA d’Habitus",
            "N’a pas de climatiseur",
            "A un nid d’oiseau à – de 20 mètres de sa résidence",
            "N’est pas allé.e voter aux dernières élections provinciales",
            "Fait ou a déjà fait du sport de compétition de haut niveau",
            "Possède un Doctorat",
            "Parle une autre langue que le français ou l’anglais",
            "A plus de 20 plantes dans sa maison",
          ].map((text, index) => (
            <button
              key={index}
              disabled={!loaded}
              className={`bg-card p-4 rounded-md border ${toggledItems.has(index) ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => toggleItem(index)}
            >
              <p>{text}</p>
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4">La personne qui remporte ce BINGO est celle ayant le plus de bonnes réponses (un petit prix sera offert).</p>
      <p className="mt-2">Bonne recherche! Le comité social Habitus.</p>
      <p className="mt-2">Votre score: {toggledItems.size}/20</p>

    </div>
  )
}
