const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('API OK 🚀');
});


const stockRoutes = require('./routes/stockRoutes');
const entreeRoutes = require('./routes/entreeRoutes');
const sortieRoutes = require('./routes/sortieRoutes');
const ligneEntreeRoutes = require('./routes/ligneEntreeRoutes');
const ligneSortieRoutes = require('./routes/ligneSortieRoutes');


const controleRoutes = require('./routes/controlequaliteRoutes');
const declarationRoutes = require('./routes/declarationdeproductionRoutes');
const ligneDeclarationRoutes = require('./routes/lignedeclarationproductionRoutes');
const ofRoutes = require('./routes/ordrefabricationRoutes');


const articleRoutes = require('./routes/articleRoutes');
const gammeRoutes = require('./routes/gammeRoutes');
const ligneRoutes = require('./routes/ligneRoutes');
const nomenclatureRoutes = require('./routes/nomenclatureRoutes');
const operationRoutes = require('./routes/operationRoutes');


const utilisateurRoutes = require('./routes/utilisateur.routes');
const atelierRoutes = require('./routes/atelier.routes');
const postetravailRoutes = require('./routes/postetravail.routes');
const artisanRoutes = require('./routes/artisan.routes');
const calendriertravailRoutes = require('./routes/calendriertravail.routes');




app.use('/api/stock', stockRoutes);
app.use('/api/entrees', entreeRoutes);
app.use('/api/sorties', sortieRoutes);
app.use('/api/ligneentrees', ligneEntreeRoutes);
app.use('/api/lignesorties', ligneSortieRoutes);


app.use('/api/controle-qualite', controleRoutes);
app.use('/api/declaration-production', declarationRoutes);
app.use('/api/ligne-declaration', ligneDeclarationRoutes);
app.use('/api/ordre-fabrication', ofRoutes);


app.use('/api/articles', articleRoutes);
app.use('/api/gammes', gammeRoutes);
app.use('/api/lignes', ligneRoutes);
app.use('/api/nomenclatures', nomenclatureRoutes);
app.use('/api/operations', operationRoutes);


app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/ateliers', atelierRoutes);
app.use('/api/ligne-stock', require('./routes/ligneStockRoutes'));
app.use('/api/postetravail', postetravailRoutes);
app.use('/api/artisans', artisanRoutes);
app.use('/api/calendriertravail', calendriertravailRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Serveur lancé sur le port ${PORT}`);
});