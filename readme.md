

## Structure du form :

Formulaire de création de compte pour tapotons.fr

### Section informations personnelles

- Nom
    - taille max : 40 chars
- Prénom
    - taille max : 40 chars

- Genre : M, Mme, Autre

- Age
    - entier strictement positif

- Adresse mail
    - contraintes d'adresse mail
    - ne se termine pas par 'yopmail.com'


### Type de compte

- Type : Gratuit, Premium

    - afficher "Vous pourrez changer de type de compte à tout moment dans les paramètres"

    - Si gratuit -> rien de spécial
    - Si premium -> 
        - prix par mois / par an
            - 4 € / mois
            - 36 € / an (soit 3 € / mois)

        - Coupon de reduction
            - coupon valide : SOLUTAP2026
            - input
            - bouton valider (appel http)
    

### Niveau en dactylo

- Savez-vous taper avec vos dix doigts au clavier ?
    - oui / non

- Quelle est votre vitesse de frappe ?
    - number input
    - contraintes : entier strictement positif (message d'erreurs...)

- Question : Avez vous déjà utilisé un site de dactylo ?
    - oui / non (bouton radio)

    - Si oui, lequel ?
        - RataType, AgileFingers (liste déroulante ou input)



