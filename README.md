# Bútorméretező Alkalmazás

Ez az alkalmazás egy **React** alapú bútorméretező és 3D modellező eszköz, amely segít bútorok tervezésében és azok méreteinek kiszámításában. Az alkalmazás lehetőséget biztosít a bútorok 3D-s vizualizálására, egyedi méretek megadására, valamint a vágási lista PDF formátumban történő exportálására.

##  Funkciók
- **Egyedi méretezés**: Bútorok szélességének, magasságának, mélységének és vastagságának konfigurálása.
- **Textúrák kiválasztása**: Különböző faanyag textúrák alkalmazása a bútorokra.
- **Bútortípusok támogatása**:
  - Egyajtós szekrény
  - Kétajtós szekrény
  - Fiókos szekrény
  - Polcos szekrény
- **3D megjelenítés**: A bútorok valós idejű vizualizációja a böngészőben.
- **PDF generálás**: Vágási lista készítése és letöltése PDF formátumban.
- **Interaktív elemek**: Ajtók nyitása/zárása és fogantyúk megjelenítése.


### 1. Telepítés

Kövesd az alábbi lépéseket az alkalmazás futtatásához:

```bash
# Klónozd a repót
git clone https://github.com/VargaGergo17/Butormeretezo-alkalmazas.git

# Navigálj a mappába
cd Butormeretezo-alkalmazas

# Függőségek telepítése
npm install
```

### 2. Indítás

Futtasd az alkalmazást helyileg:

```bash
npm start
```

Ezután az alkalmazás elérhető lesz a böngésződben a következő címen: [http://localhost:3000](http://localhost:3000).

### 3. Build

Ha a projektet Build környezetben szeretnéd futtatni, használd a következő parancsot:

```bash
npm run build
```


##  Projekt Felépítése

A projekt főbb mappái és fájljai:
```
Butormeretezo-alkalmazas/
├── src/
│   ├── components/
│   │   ├── Furniture.js      # 3D bútor komponens
│   ├── App.js                # Fő alkalmazás fájl
│   ├── index.js              # Beállítások és renderelés
├── public/
├── package.json              # Függőségek és szkriptek
```

##  Függőségek

Az alkalmazás a következő főbb könyvtárakat használja:
- **React**: Felhasználói felület fejlesztése.
- **@react-three/fiber** és **Three.js**: 3D modellezéshez.
- **jspdf** és **jspdf-autotable**: PDF generáláshoz.
- **@react-three/drei**: 3D objektumok egyszerűsített kezelése.







