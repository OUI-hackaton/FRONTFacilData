import React from "react";
const mockData = {
  Nom: "CALANDRE",
  Famille: null,
  Type: "CALANDRE BUANDERIE",
  "ID Équipement": "2F 120",
  "Référence constructeur": null,
  "Date d'installation": null,
  Notes: null,
  Secteur: "HDCER",
  Bâtiment: "Bâtiment Astoria",
  Adresse: "1 Chemin de la Liberté, 72527 Bordeaux",
  Niveau: null,
  Salle: null,
  "Cage d'escalier": null,
  "Opérationnel/HS": "Opérationnel",
  Validation: "Validé",
};

const EquipmentCard = ({ equipment }) => {
  return (
   <div>
        <h2 className="text-xl font-bold mb-2">{equipment.Nom}</h2>
        <p><strong>Type:</strong> {equipment.Type}</p>
        <p><strong>ID Équipement:</strong> {equipment["ID Équipement"]}</p>
        <p><strong>Secteur:</strong> {equipment.Secteur}</p>
        <p><strong>Bâtiment:</strong> {equipment.Bâtiment}</p>
        <p><strong>Adresse:</strong> {equipment.Adresse}</p>
        <p><strong>Statut:</strong> {equipment["Opérationnel/HS"]}</p>
        <p><strong>Validation:</strong> {equipment.Validation}</p>
    </div>
  );
};

const EquipmentList = () => {
  return (
    <div className="p-6 mx-10">
      <h1 className="text-2xl font-bold mb-4">Fiches Techniques</h1>
      <EquipmentCard equipment={mockData} />
    </div>
  );
};

export default EquipmentList;
