<template>
  <router-view />
</template>
<style>
      body{
      overflow-y: auto;
      }
  
      /* Scrollbar entière */
      body:-webkit-scrollbar {
      width: 2px;
      }
  
      /* Fond de la scrollbar */
      body:-webkit-scrollbar-track {
          background: #f0f0f0;   /*Couleur de fond*/
          border-radius: 4px;
      }
  
      /* Curseur (thumb) */
      body:-webkit-scrollbar-thumb {
     background-color: rgb(93 85 245 / 0.3);;  /* Couleur de la barre */
      border-radius: 8px;
      border: 1px solid #f0f0f0; /* Crée un effet de marge */
      }
  
      /* Hover du curseur */
      body:-webkit-scrollbar-thumb:hover {
          background-color: rgb(93 85 245 / 0.3);
      }
      body{
          scrollbar-width: thin;
          scrollbar-color: rgb(93 85 245 / 0.3) #f0f0f0;
        }
  
    </style>